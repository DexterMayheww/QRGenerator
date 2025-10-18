const qrForm = document.getElementById('qr-form');
const urlInput = document.getElementById('url-link');
const outputSection = document.getElementById('output-section');
const qrCodeContainer = document.getElementById('qr-code');
const downloadBtn = document.getElementById('download-button');
const websiteNameDisplay = document.getElementById('website-name-display');

let qrCode;
let websiteName;

qrForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = urlInput.value;

    if (url) {
        qrCodeContainer.innerHTML = '';

        qrCode = new QRCode(qrCodeContainer, {
            text: url,
            width: 256,
            height: 256,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        outputSection.style.display = 'flex';

        const parser = document.createElement('a');
        parser.href = url;
        websiteName = getDomainName(parser.hostname);

        websiteNameDisplay.textContent = websiteName.charAt(0).toUpperCase() + websiteName.slice(1) + ' QR Code';
    }
    else {
        downloadBtn.classList.add('invalid');
    }
});

downloadBtn.addEventListener('click', () => {
    const canvas = qrCodeContainer.querySelector('canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = websiteName + '-qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});


function getDomainName(hostname) {
  // Remove "www." from the beginning of the hostname
  let domain = hostname.replace(/^www\./, '');

  // Remove the top-level domain
  domain = domain.substring(0, domain.lastIndexOf('.'));
  
  // Handle cases with second-level domains like .co.uk
  if (domain.lastIndexOf('.') > 0 && domain.substring(domain.lastIndexOf('.')).length <= 3) {
      const parts = domain.split('.');
      if (parts.length > 2) {
          domain = parts.slice(0, -1).join('.');
      }
  }

  return domain;
}