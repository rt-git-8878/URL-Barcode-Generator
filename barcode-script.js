let currentQR = null;

document.getElementById('qrForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateQRCode();
});

function generateQRCode() {
    const url = document.getElementById('urlInput').value;
    const size = parseInt(document.getElementById('sizeSelect').value);
    
    if (!url) {
        alert('Please enter a valid URL');
        return;
    }

    // Clear previous QR code
    const qrDiv = document.getElementById('qrcode');
    qrDiv.innerHTML = '';

    // Generate new QR code
    currentQR = new QRCode(qrDiv, {
        text: url,
        width: size,
        height: size,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show result section
    document.getElementById('qrResult').style.display = 'block';
}

function downloadQR() {
    if (!currentQR) {
        alert('Please generate a QR code first');
        return;
    }

    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = canvas.toDataURL();
        link.click();
    }
}

function printQR() {
    const qrDiv = document.getElementById('qrcode');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Print QR Code</title>
                <style>
                    body { 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        height: 100vh; 
                        margin: 0; 
                    }
                    img { max-width: 100%; height: auto; }
                </style>
            </head>
            <body>
                ${qrDiv.innerHTML}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Add some example URLs for testing
const exampleUrls = [
    'https://www.google.com',
    'https://github.com',
    'https://stackoverflow.com',
    'https://www.youtube.com'
];

// Add placeholder rotation
let placeholderIndex = 0;
const urlInput = document.getElementById('urlInput');

setInterval(() => {
    if (!urlInput.value) {
        urlInput.placeholder = exampleUrls[placeholderIndex];
        placeholderIndex = (placeholderIndex + 1) % exampleUrls.length;
    }
}, 3000);
