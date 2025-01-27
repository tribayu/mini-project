document.addEventListener('DOMContentLoaded', () => {
    const bookform = document.getElementById('bookForm');
    const booktitle = document.getElementById('bookFormTitle');
    const bookauthor = document.getElementById('bookFormAuthor');
    const bookyear = document.getElementById('bookFormYear');
    const bookiscomplete = document.getElementById('bookFormIsComplete');
    const incompletebooklist = document.getElementById('incompleteBookList');
    const completebooklist = document.getElementById('completeBookList');

    const searchBookForm = document.getElementById('searchBook');
    searchBookForm.addEventListener('submit', searchBook);

    //fungsi untuk mengambil data buku dari localstorage
    function getbooks(){
        try {
            return JSON.parse(localStorage.getItem('books')) || [];
        } catch (error) {
            console.error('kesalahan saat mengurai buku dari localstorage:', error);
            return [];
        }
        
    }

    //fungsi untuk menyimpa data buku ke localstorage

    function savebooks (books){
        localStorage.setItem('books', JSON.stringify(books));
    }


    function createbookelement(book) {
        const bookElement = document.createElement('div');
        bookElement.setAttribute('data-bookid', book.id);
        bookElement.setAttribute('data-testid', 'bookitem');

        const booktitleElement = document.createElement('h3');
        booktitleElement.setAttribute('data-testid', 'bookitemtitle');
        booktitleElement.textContent = book.title;

        const bookauthorElement = document.createElement('p');
        bookauthorElement.setAttribute('data-testid', 'bookitemauthor');
        bookauthorElement.textContent = `penulis: ${book.author}`;

        const bookyearElement = document.createElement('p');
        bookyearElement.setAttribute('data-testid', 'bookitemyear');
        bookyearElement.textContent = `tahun: ${book.year}`;

        const buttonContainer = document.createElement('div');
        
        const completebutton = document.createElement('button');
        completebutton.setAttribute('data-testid', 'bookitemiscompletebutton');
        completebutton.textContent = book.iscomplete ? 'Selesai di baca' : 'Belum selesai di baca';
        completebutton.onclick = () => toggleCompleteStatus(book.id);

        const deletebutton = document.createElement('button');
        deletebutton.setAttribute('data-testid', 'bookitemdeletebutton');
        deletebutton.textContent = 'hapus buku';
        deletebutton.onclick = () => deletebook(book.id);

        const editbutton = document.createElement('button');
        editbutton.setAttribute('data-testid', 'bookitemeditbutton');
        editbutton.textContent = 'edit buku';
        editbutton.onclick = () => editbook(book.id);

        buttonContainer.append(completebutton, deletebutton, editbutton);
        bookElement.append(booktitleElement, bookauthorElement, bookyearElement, buttonContainer);

        return bookElement;
    }

    //fungsi untk menampilkan buku pada rak
    function renderbooks(){
        const books = getbooks();
        incompletebooklist.innerHTML = '';
        completebooklist.innerHTML ='';

        if (books.length === 0) {
            incompletebooklist.textContent = 'Tidak ada buku di rak belum selesai dibaca.';
            completebooklist.textContent = 'Tidak ada buku di rak selesai dibaca.';
            return;
        }

        books.forEach(book => {
            const bookElement = createbookelement(book);

            if (book.iscomplete) {
                completebooklist.appendChild(bookElement);
            } else {
                incompletebooklist.appendChild(bookElement);
            }
        });
    }

    //fungsi untuk menambah buku baru
    function addbook(event){
        event.preventDefault();

        if (!booktitle.value.trim() || !bookauthor.value.trim() || !bookyear.value.trim()) {
            alert('Mohon lengkapi semua data buku');
            return;
        }

        if (isNaN(parseInt(bookyear.value)) || parseInt(bookyear.value) <= 0) {
            alert('Masukkan tahun yang falid');
        }
        const newbook = {
            id: new Date().getTime(),
            title: booktitle.value,
            author: bookauthor.value,
            year: parseInt(bookyear.value),
            iscomplete: bookiscomplete.checked,
        };

        const books = getbooks();
        books.push(newbook);
        savebooks(books);
        renderbooks();

        bookform.reset();
    }

    //fungsi untuk mengubah status buku menjadi selesai di baca atau belum
    function toggleCompleteStatus(bookid){
        const books = getbooks();
        const book = books.find((b) => b.id === bookid);

        if (!book) return;

        book.iscomplete = !book.iscomplete;
        savebooks(books);
        renderbooks();
    }

    //fungsi untuk menghapus buku
    function deletebook(bookid){
        const books = getbooks().filter((b) => b.id !== bookid);
        savebooks(books);
        renderbooks();
    }

    // fungsi untuk mengedit buku
    function editbook(bookid){
        const books = getbooks();
        const book = books.find((b) => b.id === bookid);

        if (!book) return;

        booktitle.value = book.title;
        bookauthor.value = book.author;
        bookyear.value = book.year;
        bookiscomplete.checked = book.iscomplete;

        deletebook(bookid);
    }

    //fungsi untuk cari judul
    function searchBook(event) {
        event.preventDefault();
        const searchTitle = document.getElementById('searchBookTitle').value.trim().toLowerCase();

        if (searchTitle === "") {
            renderbooks();
            return;
        }
        const books = getbooks();
        const filterBooks = books.filter(book => book.title.toLowerCase().includes(searchTitle));

       // clear daftar buku sebelum menampilkan hasil
        incompletebooklist.innerHTML = '';
        completebooklist.innerHTML ='';

        if (filterBooks.length === 0) {
            incompletebooklist.textContent = 'Tidak ada buku di rak belum selesai dibaca.';
            completebooklist.textContent = 'Tidak ada buku di rak selesai dibaca.';
        } else {
            filterBooks.forEach(book => {
                const bookElement = createbookelement(book);
    
                if (book.iscomplete) {
                    completebooklist.appendChild(bookElement);
                } else {
                    incompletebooklist.appendChild(bookElement);
                }
            });
        }

    }

    //inisialisasi event listener untuk form
    bookform.addEventListener('submit', addbook);
   

    //menamoilkan buku dari localstorage saat halaman di muat
    renderbooks();
});
