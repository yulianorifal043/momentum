document.addEventListener('DOMContentLoaded', () => {

    // Definisikan semua elemen interaktif
    const step1 = document.getElementById('step-1-kepribadian');
    const step2 = document.getElementById('step-2-tujuan');
    const step3 = document.getElementById('step-3-hasil');
    
    const personalityButtons = document.querySelectorAll('.personality-choice');
    const buatRoadmapBtn = document.getElementById('buat-roadmap-btn');

    // Elemen untuk menampilkan data dinamis
    const kampusSelect = document.getElementById('kampus');
    const pekerjaanSelect = document.getElementById('pekerjaan');
    const analisisKepribadianP = document.getElementById('analisis-kepribadian');
    const tujuanAkhirSpan = document.getElementById('tujuan-akhir');
    const roadmapContainer = document.getElementById('roadmap-container');

    // Simpan pilihan pengguna
    let pilihanPengguna = {
        tipeKepribadian: '',
        kampus: '',
        pekerjaan: ''
    };

    // --- LOGIKA APLIKASI ---

    // 1. Event listener untuk Tes Kepribadian
    personalityButtons.forEach(button => {
        button.addEventListener('click', () => {
            pilihanPengguna.tipeKepribadian = button.dataset.type;
            // Transisi antar langkah
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
        });
    });

    // 2. Event listener untuk tombol "Buatkan Saya Roadmap"
    buatRoadmapBtn.addEventListener('click', () => {
        pilihanPengguna.kampus = kampusSelect.value;
        pilihanPengguna.pekerjaan = pekerjaanSelect.value;

        // Tampilkan hasil akhir
        tampilkanHasilDanRoadmap();
    });

    // 3. Fungsi utama untuk menampilkan hasil
    function tampilkanHasilDanRoadmap() {
        // Transisi ke layar hasil
        step2.classList.add('hidden');
        step3.classList.remove('hidden');

        // Generate Analisis Kepribadian
        generateAnalisis();
        
        // Generate Roadmap
        generateRoadmap();
    }

    // 4. Fungsi untuk membuat teks analisis kepribadian
    function generateAnalisis() {
        const tipe = pilihanPengguna.tipeKepribadian;
        let deskripsi = '';
        if (tipe === 'Perencana') {
            deskripsi = "Anda adalah seorang **Perencana (The Planner)**. Kekuatan terbesar Anda adalah kemampuan melihat gambaran besar dan menyusun strategi yang terstruktur. Anda unggul dalam persiapan dan meminimalisir risiko.";
        } else if (tipe === 'Eksekutor') {
            deskripsi = "Anda adalah seorang **Eksekutor (The Doer)**. Anda tidak takut mengambil tindakan dan memiliki dorongan kuat untuk mewujudkan ide menjadi kenyataan. Energi Anda menular dan fokus pada hasil.";
        } else if (tipe === 'Inovator') {
            deskripsi = "Anda adalah seorang **Inovator (The Innovator)**. Anda berkembang dengan ide-ide baru dan senang menantang status quo. Kekuatan Anda adalah kreativitas dan kemampuan berpikir *out-of-the-box*.";
        } else { // Analis
            deskripsi = "Anda adalah seorang **Analis (The Analyst)**. Anda teliti, berbasis data, dan selalu berpikir kritis. Anda tidak terburu-buru dan memastikan setiap keputusan memiliki dasar yang kuat.";
        }
        analisisKepribadianP.innerHTML = deskripsi;
    }

    // 5. Fungsi untuk membuat roadmap dinamis
    function generateRoadmap() {
        roadmapContainer.innerHTML = ''; // Kosongkan roadmap sebelumnya
        const tujuan = `${pilihanPengguna.pekerjaan} setelah lulus dari ${pilihanPengguna.kampus}`;
        tujuanAkhirSpan.textContent = tujuan;

        // Buat daftar langkah roadmap
        const langkahRoadmap = [
            "Tingkatkan Nilai Akademik di semester akhir SMA.",
            "Fokus pada mata pelajaran yang relevan dengan jurusan pilihan.",
            "Ikuti bimbingan belajar atau kursus persiapan UTBK/SNBT.",
            "Latih soal-soal Ujian Mandiri kampus pilihanmu secara rutin.",
            "Lulus Ujian Masuk & menjadi Mahasiswa Baru!",
            "Aktif di organisasi kemahasiswaan yang relevan dengan minat karier.",
            "Ambil mata kuliah pilihan yang mendukung tujuan karier di BUMN.",
            "Cari kesempatan magang di perusahaan BUMN atau yang sejenis.",
            "Bangun portofolio proyek dan jaringan profesional.",
            "Lulus dengan predikat memuaskan dan siap melamar!"
        ];

        // Tampilkan setiap langkah di kontainer
        langkahRoadmap.forEach((langkah, index) => {
            const itemRoadmap = document.createElement('div');
            itemRoadmap.className = 'flex items-center space-x-3';
            itemRoadmap.innerHTML = `
                <div class="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">${index + 1}</div>
                <p class="text-sm text-gray-800">${langkah}</p>
            `;
            roadmapContainer.appendChild(itemRoadmap);
        });
    }
});