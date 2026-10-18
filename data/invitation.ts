// All missing facts stay explicitly pending. Replace centrally after approval.
export const invitation = {
  music: {
    src: "/audio/reverie-sample.mp3",
    title: "Reverie",
    artist: "Scott Buckley",
    source: "https://www.scottbuckley.com.au/library/reverie/",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  dateISO: null as string | null,
  date: "Tanggal pernikahan menyusul",
  time: "Waktu acara menyusul",
  venue: "Nama venue menyusul",
  location: "Lokasi pernikahan menyusul",
  address: "Alamat lengkap menyusul",
  mapUrl: null as string | null,
  story:
    "Surat pribadi Rizal & Dewi akan hadir di sini setelah cerita dan teks disetujui.",
  closing: "Pesan penutup dari Rizal & Dewi akan hadir di sini.",
  preview: "PRATINJAU — KONTEN BELUM FINAL",
  placeholder: "DUMMY DATA · MENUNGGU KONTEN FINAL",
  monogram: "/assets/optimized/monogram_RD_exact_illustration.webp",
  galleryPending: {
    title: "Foto Rizal & Dewi belum tersedia.",
    description: "Menunggu foto dan urutan yang disetujui.",
  },
  gallery: [
    {
      src: null as string | null,
      alt: "",
      caption: "Foto utama",
      aspect: "portrait",
    },
    {
      src: null as string | null,
      alt: "",
      caption: "Momen bersama",
      aspect: "landscape",
    },
    {
      src: null as string | null,
      alt: "",
      caption: "Detail kenangan",
      aspect: "portrait",
    },
  ],
  rsvp: {
    question: "Apakah Anda akan hadir?",
    note: "Satu undangan untuk satu orang. Jawaban pertama yang berhasil dikirim bersifat final.",
    missing: "Buka tautan undangan pribadi Anda untuk mengirim jawaban.",
    unavailable:
      "RSVP belum tersedia. Pilihan Anda tetap tersimpan di halaman ini; silakan coba lagi nanti.",
    invalid:
      "Undangan tidak dapat digunakan. Silakan hubungi pengirim undangan.",
    error: "Jawaban belum terkirim. Periksa koneksi Anda, lalu coba lagi.",
    success: "Terima kasih. Jawaban Anda telah diterima dan bersifat final.",
    final: "Jawaban undangan ini sudah diterima dan tidak dapat diubah.",
  },
};
