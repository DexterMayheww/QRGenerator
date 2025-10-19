const qrForm = document.getElementById('qr-form');
const urlInput = document.getElementById('url-link');
const outputSection = document.getElementById('output-section');
const qrCodeContainer = document.getElementById('qr-code');
const downloadBtn = document.getElementById('download-button');
const websiteNameDisplay = document.getElementById('website-name-display');
const advancedBtn = document.querySelector('.advanced-button');
const advancedOptions = document.getElementById('advanced-options');
const dotColorInput = document.getElementById('dot-color');
const dotTypeInput = document.getElementById('dot-type');
const backgroundColorInput = document.getElementById('background-color');
const closeAdvancedBtn = document.getElementById('close-advanced');
const overlay = document.getElementById('overlay');
const sizeSelector = document.getElementById('size-selector');
const clearInput = document.getElementById('clear-input');

let qrCode;
let websiteName;

let size = 200;

const generateQRCode = () => {
    const url = urlInput.value;

    if (url) {
        qrCodeContainer.innerHTML = '';

        if(size >= 500) {
            qrCodeContainer.style.padding  = '10px';
        }
        else {
            qrCodeContainer.style.padding = '0';
        }

        qrCode = new QRCodeStyling({
            width: size,
            height: size,
            data: url,
            margin: 10,
            qrOptions: {
                errorCorrectionLevel: 'H'
            },
            dotsOptions: {
                color: dotColorInput.value,
                type: dotTypeInput.value
            },
            backgroundOptions: {
                color: backgroundColorInput.value,
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 5
            }
        });
        qrCode.append(qrCodeContainer);

        outputSection.style.display = 'flex';
        document.body.style.justifyContent = 'start';
        downloadBtn.classList.remove('invalid');

        advancedOptions.classList.add('output-visible');

        const parser = document.createElement('a');
        parser.href = url;
        websiteName = getDomainName(parser.hostname);

        websiteNameDisplay.textContent = websiteName.charAt(0).toUpperCase() + websiteName.slice(1) + ' QR Code';
    } else {
        downloadBtn.classList.add('invalid');
    }
};

qrForm.addEventListener('submit', (event) => {
    event.preventDefault();
    generateQRCode();
});

downloadBtn.addEventListener('click', () => {
    if (qrCode) {
        qrCode.download({ name: websiteName + "-qr-code", extension: "png" });
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

clearInput.addEventListener('click', () => {
    urlInput.value = '';
});

advancedBtn.addEventListener('click', () => {
    advancedOptions.classList.add('active');
    overlay.classList.add('active');
});

closeAdvancedBtn.addEventListener('click', () => {
    advancedOptions.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    advancedOptions.classList.remove('active');
    overlay.classList.remove('active');
});

urlInput.addEventListener('input', generateQRCode);
dotColorInput.addEventListener('input', generateQRCode);
dotTypeInput.addEventListener('change', generateQRCode);
backgroundColorInput.addEventListener('input', generateQRCode);

sizeSelector.addEventListener('change', () => {
    size = sizeSelector.value;
    generateQRCode();
});