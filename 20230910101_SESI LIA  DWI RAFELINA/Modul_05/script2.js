$(document).ready(function () {
    // Event Mouse: Click dan Hover
    $("#contactButton").click(function () {
        alert("Anda akan menghubungi alumni!");
    });

    $("#hoverProfile").hover(
        function () {
            $(this).css({
                "background-color": "lightblue",
                "transform": "scale(1.05)",
                "box-shadow": "0 4px 8px rgba(0, 0, 0, 0.3)"
            });
            $(this).find("img").css({
                "transform": "scale(1.1)",
                "filter": "brightness(1.2)"
            });
        },
        function () {
            $(this).css({
                "background-color": "lightgray",
                "transform": "scale(1)",
                "box-shadow": "none"
            });
            $(this).find("img").css({
                "transform": "scale(1)",
                "filter": "brightness(1)"
            });
        }
    );

    // Event Keyboard: Keydown
    $("#searchAlumni").keydown(function (event) {
        $("#output").text("Anda mengetik: " + event.key);
    });

    // Event Form: Submit
    $("#alumniForm").submit(function (event) {
        event.preventDefault();
        const name = $("#name").val();
        const year = $("#year").val();
        const photo = $("#photo")[0].files[0];

        if (name && year && photo) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newRow = `
                    <tr>
                        <td class="name">${name}</td>
                        <td class="year">${year}</td>
                        <td><img src="${e.target.result}" alt="Photo ${name}" class="alumni-photo"></td>
                        <td><button class="delete">Hapus</button></td>
                    </tr>`;
                $("#alumniTable tbody").append(newRow);
            };
            reader.readAsDataURL(photo);
            alert(`Data alumni ditambahkan!\nNama: ${name}\nTahun: ${year}`);
        } else {
            alert("Harap isi semua kolom!");
        }
    });

    // Event Dokumen/Window: Resize
    $(window).resize(function () {
        const width = $(window).width();
        const height = $(window).height();
        $('#windowSize').text(`Ukuran Jendela: ${width}x${height}`);
    });

    // Event Kustom: Trigger custom event
    $('#contactButton').click(function () {
        $('#output').trigger('customEvent', ['Kontak alumni diklik!']);
    });

    $('#output').on('customEvent', function (event, message) {
        $(this).append('<p>Event kustom dipicu: ' + message + '</p>');
    });

    // Animasi Foto
    $('#alumniTable').on({
        mouseenter: function () {
            $(this).css({
                'transform': 'scale(1.1)',
                'filter': 'brightness(1.2)'
            });
        },
        mouseleave: function () {
            $(this).css({
                'transform': 'scale(1)',
                'filter': 'brightness(1)'
            });
        },
        mousedown: function () {
            $(this).css({
                'transform': 'scale(0.95)',
                'filter': 'brightness(0.8)'
            });
        },
        mouseup: function () {
            $(this).css({
                'transform': 'scale(1)',
                'filter': 'brightness(1)'
            });
        },
        dblclick: function () {
            $(this).css({
                'transform': 'rotate(15deg)',
                'filter': 'brightness(1)'
            });
        }
    }, 'img');

    // Event Miscellaneous
    $('#alumniTable').on({
        selectstart: function () {
            $('#output').text('Gambar sedang dipilih...');
        },
        mouseup: function () {
            $('#output').text('Mouse button dilepaskan pada gambar.');
        },
        mousemove: function (event) {
            const offsetX = event.offsetX;
            const offsetY = event.offsetY;
            $('#output').text(`Gerakan mouse: X=${offsetX}, Y=${offsetY}`);
        }
    }, 'img');

    // Hapus Alumni
    $('#alumniTable').on('click', '.delete', function () {
        $(this).closest('tr').remove();
    });
});
