import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const root = process.env.QA_ROOT || "docs/qa/phase5";
mkdirSync(root, { recursive: true });
const sections = ["hero", "our-story", "the-wedding", "venue", "gallery", "rsvp", "closing"];

test("invitation identity changes reset the previous final RSVP", async ({ page }) => {
  await page.route("**/api/rsvp", route => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({status:"accepted",response:"attending"}) }));
  await page.goto("/?open=1#invite=" + "A".repeat(43));
  expect(await page.locator('.response-option').first().evaluate(el=>getComputedStyle(el).fontFamily.replaceAll('_',' '))).toContain('DM Sans');
  await page.getByRole("radio", {name:"Attending",exact:true}).check();
  await page.getByRole("button", {name:"KIRIM JAWABAN"}).click();
  await expect(page.getByRole("button", {name:"JAWABAN DITERIMA"})).toBeVisible();
  await page.evaluate(() => { location.hash = "invite=" + "B".repeat(43); });
  await expect(page.getByRole("radio", {name:"Attending",exact:true})).not.toBeChecked();
  await expect(page.getByRole("radio", {name:"Attending",exact:true})).toBeEnabled();
  await expect(page.getByRole("button", {name:"KIRIM JAWABAN"})).toBeDisabled();
});

test("late response from the previous invitation cannot finalize the new one", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/api/rsvp", async route => { await gate; await route.fulfill({status:200,contentType:"application/json",body:JSON.stringify({status:"accepted",response:"attending"})}).catch(()=>{}); });
  await page.goto("/?open=1#invite=" + "A".repeat(43));
  await page.getByRole("radio", {name:"Attending",exact:true}).check();
  await page.getByRole("button", {name:"KIRIM JAWABAN"}).click();
  await page.evaluate(() => { location.hash = "invite=" + "B".repeat(43); });
  release();
  await expect(page.getByRole("radio", {name:"Attending",exact:true})).toBeEnabled();
  await expect(page.getByRole("radio", {name:"Attending",exact:true})).not.toBeChecked();
  await expect(page.getByRole("button", {name:"KIRIM JAWABAN"})).toBeDisabled();
  await expect(page.locator(".form-status")).toBeEmpty();
});

test("slow, fast and reverse scrolling leave content readable and motion finite", async ({ page }) => {
  test.setTimeout(90000);
  await page.goto("/?open=1",{waitUntil:"networkidle"});
  for (const id of sections) {
    await page.locator('#'+id).scrollIntoViewIfNeeded();
    await page.locator('#'+id+' img').evaluateAll(images => Promise.all(images.map(i => (i as HTMLImageElement).decode().catch(()=>{}))));
    await page.waitForTimeout(350);
  }
  for (const id of [...sections].reverse()) { await page.locator('#'+id).scrollIntoViewIfNeeded(); await page.waitForTimeout(35); }
  await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
  await page.waitForTimeout(80);
  await page.evaluate(()=>scrollTo(0,0));
  await page.waitForTimeout(3000);
  expect(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length)).toBe(0);
  for(const id of sections){
    await page.locator('#'+id).scrollIntoViewIfNeeded();
    await expect(page.locator('#'+id)).not.toHaveAttribute('inert');
    expect(await page.locator('#'+id+' [data-reveal]').evaluateAll(nodes=>nodes.every(n=>Number(getComputedStyle(n).opacity)>0))).toBe(true);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.mouse.wheel(0,-400); await page.waitForTimeout(200);
  expect(await page.evaluate(()=>scrollY<document.documentElement.scrollHeight-innerHeight)).toBe(true);
});

test("direct opened navigation, full-page axe and resource diagnostics", async ({ page }) => {
  test.setTimeout(90000);
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.addInitScript(()=>{
    (window as unknown as {qa:{cls:number,lcp:number}}).qa={cls:0,lcp:0};
    new PerformanceObserver(list=>{for(const entry of list.getEntries()){const e=entry as PerformanceEntry&{value:number,hadRecentInput:boolean};if(!e.hadRecentInput)(window as unknown as {qa:{cls:number}}).qa.cls+=e.value;}}).observe({type:'layout-shift',buffered:true});
    new PerformanceObserver(list=>{(window as unknown as {qa:{lcp:number}}).qa.lcp=list.getEntries().at(-1)!.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
  });
  await page.goto("/?open=1#rsvp",{waitUntil:"networkidle"});
  const initial = await page.evaluate(() => ({...((window as unknown as {qa:object}).qa),scrollY, rsvpTop:document.getElementById('rsvp')!.getBoundingClientRect().top}));
  expect(initial.scrollY).toBeGreaterThan(0);
  const scrollMargin = await page.locator('#rsvp').evaluate(el=>parseFloat(getComputedStyle(el).scrollMarginTop));
  expect(Math.abs(initial.rsvpTop-scrollMargin)).toBeLessThan(2);
  for(const id of sections){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.locator('#'+id+' img').evaluateAll(images=>Promise.all(images.map(i=>(i as HTMLImageElement).decode())));}
  const axe=await new AxeBuilder({page}).analyze();
  writeFileSync(root+'/full-axe.json',JSON.stringify(axe,null,2));
  expect(axe.violations).toEqual([]);
  const metrics=await page.evaluate(()=>({initial:((window as unknown as {qa:object}).qa),videoCount:document.querySelectorAll('video').length,resources:performance.getEntriesByType('resource').map(r=>{const e=r as PerformanceResourceTiming;return {name:new URL(e.name).pathname,type:e.initiatorType,transfer:e.transferSize,decoded:e.decodedBodySize};})}));
  writeFileSync(root+'/resources.json',JSON.stringify({initialNavigation:initial,afterScroll:metrics},null,2));
  expect(metrics.videoCount).toBe(0);
  expect(await page.locator('img').evaluateAll(images=>images.every(i=>i instanceof HTMLImageElement&&i.complete&&i.naturalWidth>0))).toBe(true);
});

test("blocked image downloads preserve the invitation and monogram fallback", async ({ page }) => {
  await page.route('**/*',route=>route.request().resourceType()==='image'?route.abort():route.continue());
  await page.goto('/');
  await expect(page.locator('.cover').getByText('Artwork monogram belum tersedia')).toBeVisible();
  await page.getByRole('button',{name:'BUKA UNDANGAN'}).click();
  await page.locator('.phase-opened').waitFor();
  await expect(page.locator('#hero-title')).toBeFocused();
  await page.locator('#rsvp').scrollIntoViewIfNeeded();
  await expect(page.getByRole('radio')).toHaveCount(2);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test("operator routes deny forged sessions, foreign mutations and public caching", async ({ request, baseURL }) => {
  const exportResponse=await request.get('/api/operator/export',{headers:{Cookie:'operator_session=forged-token'}});
  expect(exportResponse.status()).toBe(401);
  expect(exportResponse.headers()['cache-control']).toContain('no-store');
  const foreign=await request.post('/api/operator/login',{headers:{Origin:'https://untrusted.invalid'},data:{email:'qa@example.invalid',password:'synthetic'}});
  expect(foreign.status()).toBe(403);
  const malformed=await request.post('/api/operator/login',{headers:{Origin:baseURL!},data:{email:[],password:null}});
  expect(malformed.status()).toBe(400);
  const response=await request.post('/api/rsvp',{headers:{Origin:baseURL!},data:{token:'bad',response:'attending'}});
  expect(response.status()).toBe(404);expect(response.headers()['cache-control']).toContain('no-store');
});
