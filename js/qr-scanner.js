/**
 * Navigo Nepal — Official QR Code Scanner Module
 * Provides live camera scanning & image upload QR decoding to load Member Profile Details.
 */

(function () {
  'use strict';

  // Inject jsQR library if not loaded
  function loadJsQRScript() {
    return new Promise((resolve, reject) => {
      if (window.jsQR) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load jsQR library'));
      document.head.appendChild(script);
    });
  }

  // Play subtle success chime using Web Audio API
  function playSuccessSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Ignore audio context autoplay errors
    }
  }

  // Modal State
  let modalContainer = null;
  let videoStream = null;
  let animFrameId = null;
  let isScanning = false;

  function createScannerModal() {
    if (document.getElementById('nvgQrScannerModal')) return;

    modalContainer = document.createElement('div');
    modalContainer.id = 'nvgQrScannerModal';
    modalContainer.className = 'nvg-qr-modal-backdrop';
    modalContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(10, 15, 26, 0.88);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 99999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    `;

    modalContainer.innerHTML = `
      <div class="nvg-qr-modal-content" style="
        background: #121418;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 24px;
        width: 100%;
        max-width: 480px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
        overflow: hidden;
        position: relative;
        color: #F8FAFC;
      ">
        <!-- Modal Header -->
        <div style="
          padding: 1.25rem 1.5rem;
          background: #1E293B;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <div style="
              background: linear-gradient(135deg, #2563EB, #1D4ED8);
              width: 34px;
              height: 34px;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
            ">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2.5">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.1rem; font-weight: 800; color: #FFF;">Scan Member QR Code</h3>
              <p style="margin: 0; font-size: 0.75rem; color: #94A3B8;">Point camera at an official Navigo Nepal ID Card</p>
            </div>
          </div>
          <button id="closeQrScannerBtn" style="
            background: rgba(255,255,255,0.08);
            border: none;
            color: #94A3B8;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all 0.2s;
          " onmouseover="this.style.color='#FFF'; this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.color='#94A3B8'; this.style.background='rgba(255,255,255,0.08)'">&times;</button>
        </div>

        <!-- Mode Toggle Tabs -->
        <div style="
          display: flex;
          background: #0F172A;
          padding: 6px;
          gap: 6px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        ">
          <button id="qrTabCamera" style="
            flex: 1;
            padding: 0.6rem;
            border: none;
            border-radius: 12px;
            background: #2563EB;
            color: #FFF;
            font-weight: 700;
            font-size: 0.85rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            transition: all 0.2s;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            Live Camera
          </button>
          <button id="qrTabUpload" style="
            flex: 1;
            padding: 0.6rem;
            border: none;
            border-radius: 12px;
            background: transparent;
            color: #94A3B8;
            font-weight: 700;
            font-size: 0.85rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            transition: all 0.2s;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Upload QR Image
          </button>
        </div>

        <!-- Camera View Area -->
        <div id="qrCameraContainer" style="position: relative; width: 100%; height: 320px; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          <video id="qrVideo" playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
          <canvas id="qrCanvas" style="display: none;"></canvas>

          <!-- Scanning Overlay Frame -->
          <div id="qrScanOverlay" style="
            position: absolute;
            width: 220px;
            height: 220px;
            border: 2px solid rgba(37, 99, 235, 0.8);
            border-radius: 20px;
            box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.55);
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
          ">
            <div style="
              position: absolute;
              top: -2px; left: -2px; width: 24px; height: 24px;
              border-top: 4px solid #60A5FA; border-left: 4px solid #60A5FA;
              border-top-left-radius: 16px;
            "></div>
            <div style="
              position: absolute;
              top: -2px; right: -2px; width: 24px; height: 24px;
              border-top: 4px solid #60A5FA; border-right: 4px solid #60A5FA;
              border-top-right-radius: 16px;
            "></div>
            <div style="
              position: absolute;
              bottom: -2px; left: -2px; width: 24px; height: 24px;
              border-bottom: 4px solid #60A5FA; border-left: 4px solid #60A5FA;
              border-bottom-left-radius: 16px;
            "></div>
            <div style="
              position: absolute;
              bottom: -2px; right: -2px; width: 24px; height: 24px;
              border-bottom: 4px solid #60A5FA; border-right: 4px solid #60A5FA;
              border-bottom-right-radius: 16px;
            "></div>
            
            <!-- Laser Scanning Beam -->
            <div id="qrLaserBeam" style="
              width: 100%;
              height: 3px;
              background: linear-gradient(90deg, transparent, #38BDF8, #2563EB, #38BDF8, transparent);
              box-shadow: 0 0 15px #38BDF8;
              position: absolute;
              top: 10px;
              animation: nvgScanBeam 2s infinite ease-in-out;
            "></div>
          </div>

          <div id="qrStatusMsg" style="
            position: absolute;
            bottom: 12px;
            background: rgba(15, 23, 42, 0.85);
            color: #38BDF8;
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.35rem 1rem;
            border-radius: 20px;
            border: 1px solid rgba(56, 189, 248, 0.3);
            letter-spacing: 0.02em;
          ">Align QR Code inside box</div>
        </div>

        <!-- File Upload View Area -->
        <div id="qrUploadContainer" style="display: none; padding: 2rem 1.5rem; text-align: center; background: #0F172A;">
          <div id="qrDropZone" style="
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            padding: 2.5rem 1.5rem;
            background: rgba(255, 255, 255, 0.02);
            cursor: pointer;
            transition: all 0.2s;
          " onmouseover="this.style.borderColor='#2563EB'; this.style.background='rgba(37,99,235,0.05)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.2)'; this.style.background='rgba(255,255,255,0.02)'">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="1.5" style="margin-bottom: 0.75rem;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p style="margin: 0 0 0.3rem 0; font-size: 0.95rem; font-weight: 700; color: #FFF;">Click or Drag & Drop QR Image</p>
            <p style="margin: 0; font-size: 0.75rem; color: #94A3B8;">Supports PNG, JPG, JPEG, WEBP</p>
            <input type="file" id="qrFileInput" accept="image/*" style="display: none;">
          </div>
          <div id="uploadStatusMsg" style="margin-top: 1rem; font-size: 0.85rem; color: #94A3B8;"></div>
        </div>

        <!-- Modal Footer Manual Fallback -->
        <div style="
          padding: 1rem 1.25rem;
          background: #121418;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          gap: 0.5rem;
        ">
          <input type="text" id="manualMemberInput" placeholder="Enter Member ID (e.g. NVG-2026-001 or 1)" style="
            flex: 1;
            padding: 0.6rem 0.9rem;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: #1E293B;
            color: #FFF;
            font-size: 0.85rem;
            outline: none;
          ">
          <button id="manualVerifyBtn" style="
            background: #2563EB;
            color: #FFF;
            border: none;
            padding: 0.6rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.85rem;
            cursor: pointer;
            white-space: nowrap;
          ">Go</button>
        </div>
      </div>
    `;

    // Inject laser animation CSS keyframe
    if (!document.getElementById('nvgScanStyle')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'nvgScanStyle';
      styleTag.innerHTML = `
        @keyframes nvgScanBeam {
          0% { top: 10px; opacity: 0.3; }
          50% { top: 200px; opacity: 1; }
          100% { top: 10px; opacity: 0.3; }
        }
      `;
      document.head.appendChild(styleTag);
    }

    document.body.appendChild(modalContainer);

    // Event Listeners
    document.getElementById('closeQrScannerBtn').addEventListener('click', stopAndCloseScanner);
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) stopAndCloseScanner();
    });

    const qrTabCamera = document.getElementById('qrTabCamera');
    const qrTabUpload = document.getElementById('qrTabUpload');
    const cameraContainer = document.getElementById('qrCameraContainer');
    const uploadContainer = document.getElementById('qrUploadContainer');

    qrTabCamera.addEventListener('click', () => {
      qrTabCamera.style.background = '#2563EB';
      qrTabCamera.style.color = '#FFF';
      qrTabUpload.style.background = 'transparent';
      qrTabUpload.style.color = '#94A3B8';
      cameraContainer.style.display = 'flex';
      uploadContainer.style.display = 'none';
      startCameraScanning();
    });

    qrTabUpload.addEventListener('click', () => {
      qrTabUpload.style.background = '#2563EB';
      qrTabUpload.style.color = '#FFF';
      qrTabCamera.style.background = 'transparent';
      qrTabCamera.style.color = '#94A3B8';
      uploadContainer.style.display = 'block';
      cameraContainer.style.display = 'none';
      stopCameraStream();
    });

    const dropZone = document.getElementById('qrDropZone');
    const fileInput = document.getElementById('qrFileInput');

    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = '#2563EB';
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        handleFileUpload();
      }
    });

    document.getElementById('manualVerifyBtn').addEventListener('click', handleManualSubmit);
    document.getElementById('manualMemberInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleManualSubmit();
    });
  }

  function handleManualSubmit() {
    const input = document.getElementById('manualMemberInput');
    const val = input ? input.value.trim() : '';
    if (val) {
      handleScannedResult(val);
    }
  }

  function handleFileUpload() {
    const fileInput = document.getElementById('qrFileInput');
    const statusMsg = document.getElementById('uploadStatusMsg');
    if (!fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    statusMsg.textContent = 'Decoding QR Code image...';
    statusMsg.style.color = '#38BDF8';

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        if (window.jsQR) {
          const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert'
          });
          if (code && code.data) {
            statusMsg.textContent = '✅ QR Code successfully decoded!';
            statusMsg.style.color = '#34D399';
            handleScannedResult(code.data);
          } else {
            statusMsg.textContent = '❌ No valid QR code detected in image. Please try another photo.';
            statusMsg.style.color = '#F87171';
          }
        } else {
          statusMsg.textContent = '❌ Scanner engine unavailable.';
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function startCameraScanning() {
    const video = document.getElementById('qrVideo');
    const statusMsg = document.getElementById('qrStatusMsg');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      statusMsg.textContent = 'Camera not supported by browser';
      statusMsg.style.color = '#F87171';
      return;
    }

    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    })
      .then((stream) => {
        videoStream = stream;
        video.srcObject = stream;
        video.setAttribute('playsinline', true);
        video.play();
        isScanning = true;
        statusMsg.textContent = 'Align QR Code inside box';
        statusMsg.style.color = '#38BDF8';
        requestAnimationFrame(tickScan);
      })
      .catch((err) => {
        console.warn('Camera access error:', err);
        statusMsg.textContent = 'Camera access denied or unavailable';
        statusMsg.style.color = '#F87171';
      });
  }

  function tickScan() {
    if (!isScanning) return;

    const video = document.getElementById('qrVideo');
    const canvas = document.getElementById('qrCanvas');

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (window.jsQR) {
        const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });

        if (code && code.data && code.data.trim().length > 0) {
          isScanning = false;
          playSuccessSound();
          const statusMsg = document.getElementById('qrStatusMsg');
          statusMsg.textContent = '✅ QR Code Scanned!';
          statusMsg.style.color = '#34D399';
          
          setTimeout(() => {
            handleScannedResult(code.data);
          }, 300);
          return;
        }
      }
    }

    animFrameId = requestAnimationFrame(tickScan);
  }

  function stopCameraStream() {
    isScanning = false;
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      videoStream = null;
    }
  }

  function stopAndCloseScanner() {
    stopCameraStream();
    if (modalContainer) {
      modalContainer.style.display = 'none';
    }
  }

  // Parse payload string scanned from QR code and navigate to member details
  function handleScannedResult(qrDataString) {
    stopAndCloseScanner();
    const str = qrDataString.trim();
    
    // Check if scanned result is a full URL
    let targetId = '';
    let queryParamsStr = '';

    if (str.includes('http://') || str.includes('https://') || str.includes('idcard') || str.includes('verify.html')) {
      try {
        const urlObj = new URL(str.startsWith('http') ? str : `https://${str}`);
        // Extract 'id' query param if exists
        targetId = urlObj.searchParams.get('id') || urlObj.searchParams.get('member');
        queryParamsStr = urlObj.search;

        // If no query param, check pathname last segment (e.g. navigonepal.org/idcard/1)
        if (!targetId) {
          const segments = urlObj.pathname.split('/').filter(Boolean);
          const last = segments[segments.length - 1];
          if (last && last !== 'idcard' && last !== 'verify.html' && last !== 'index.html') {
            targetId = last;
          }
        }
      } catch (e) {
        targetId = str;
      }
    } else {
      targetId = str;
    }

    if (!targetId) targetId = str;

    // Build current destination URL
    const isIdcardFolder = window.location.pathname.includes('/idcard/');
    const targetPage = isIdcardFolder ? 'index.html' : 'verify.html';

    let finalUrl = `${targetPage}?id=${encodeURIComponent(targetId)}`;
    if (queryParamsStr && queryParamsStr.includes('&')) {
      // Append extra details if present
      finalUrl += queryParamsStr.replace('?', '&');
    }

    // Check if on verify.html or idcard/index.html to update view dynamically or navigate
    if (window.location.pathname.endsWith('verify.html') || window.location.pathname.includes('/idcard/')) {
      window.location.href = finalUrl;
    } else {
      // From root index.html or other pages, navigate to verify.html
      window.location.href = `verify.html?id=${encodeURIComponent(targetId)}`;
    }
  }

  // Public API
  window.NvgQrScanner = {
    open: function () {
      loadJsQRScript().then(() => {
        createScannerModal();
        modalContainer.style.display = 'flex';
        // Default to live camera scanning on open
        document.getElementById('qrTabCamera').click();
      }).catch(err => {
        alert('Could not initialize QR Scanner engine. Please check internet connection.');
      });
    },
    close: stopAndCloseScanner
  };

})();
