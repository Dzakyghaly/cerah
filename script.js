const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwxWqcZrNzhyf0wQw3DyYxvcBaYZZKO8CapigfQGDjORSHfRUsWWSDHrkk3zlg0SdjI/exec";

let saldo = 0;

/* FORMAT RUPIAH */
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

/* SIMPAN DATA */
function simpanData() {
  const keterangan = document.getElementById("keterangan").value;

  const jumlah = Number(document.getElementById("jumlah").value);

  const jenis = document.getElementById("jenis").value;

  const kategori = document.getElementById("kategori").value;

  /* VALIDASI */
  if (keterangan.trim() === "" || jumlah <= 0) {
    alert("Isi semua data!");
    return;
  }

  /* UPDATE SALDO */
  if (jenis === "Pemasukan") {
    saldo += jumlah;
  } else {
    saldo -= jumlah;
  }

  /* TAMPILKAN SALDO */
  document.getElementById("totalSaldo").innerText = formatRupiah(saldo);

  /* BUAT ITEM */
  const li = document.createElement("li");

  /* WARNA */
  if (jenis === "Pemasukan") {
    li.classList.add("masuk");
  } else {
    li.classList.add("keluar");
  }

  /* ISI */
  li.innerHTML = `

    <div class="jenis">
      ${jenis}
    </div>

    <div class="keterangan">
      ${keterangan}
    </div>

    <div class="keterangan">
      📂 ${kategori}
    </div>

    <div class="nominal">
      ${formatRupiah(jumlah)}
    </div>

  `;

  /* TAMPILKAN KE RIWAYAT */
  document.getElementById("transaksiList").prepend(li);

  /* KIRIM KE SPREADSHEET */
  fetch(WEB_APP_URL, {
    method: "POST",

    body: JSON.stringify({
      keterangan: keterangan,
      jumlah: jumlah,
      jenis: jenis,
      kategori: kategori,
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      console.log("Berhasil:", data);
    })
    .catch((err) => {
      console.log("Error:", err);
    });

  /* RESET */
  document.getElementById("keterangan").value = "";
  document.getElementById("jumlah").value = "";
}
