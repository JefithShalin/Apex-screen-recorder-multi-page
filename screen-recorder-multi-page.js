var recPopup = null;

function openRecorderPopup() {
  if (recPopup && !recPopup.closed) {
    recPopup.focus();
    return;
  }

  recPopup = window.open('', 'ScreenRecorder',
    'width=420,height=340,top=100,left=100,resizable=yes,scrollbars=no'
  );

  recPopup.document.open();
  recPopup.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Screen Recorder</title>
      <style>
        body {
          font-family: "Segoe UI", Arial, sans-serif;
          padding: 16px;
          background: linear-gradient(135deg, #f0f4f8, #f9fafb);
          margin: 0;
        }
        .rec-card {
          background: #fff;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
          border: 1px solid #e5e7eb;
        }
        h3 {
          margin: 0 0 14px;
          font-size: 16px;
          color: #222;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        button {
          padding: 8px 16px;
          margin-right: 8px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.25s ease;
          letter-spacing: 0.3px;
        }
        #startBtn {
          background: linear-gradient(135deg, #0076DF, #4da3ff);
          color: #fff;
        }
        #stopBtn {
          background: linear-gradient(135deg, #D94F00, #ff8a50);
          color: #fff;
        }
        #downloadBtn {
          background: linear-gradient(135deg, #2E7D32, #66bb6a);
          color: #fff;
          margin-top: 12px;
          display: none;
        }
        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        button:active:not(:disabled) {
          transform: scale(0.96);
        }
        button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }
        #recStatus {
          display: block;
          margin-top: 12px;
          font-size: 13px;
          color: #555;
        }
        #timer {
          font-size: 13px;
          color: #D94F00;
          font-weight: bold;
          display: none;
          margin-top: 6px;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        video {
          width: 100%;
          margin-top: 14px;
          border-radius: 10px;
          display: none;
          background: #000;
          border: 1px solid #ddd;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .btn-row {
          margin-bottom: 6px;
        }
      </style>
    </head>
    <body>
      <div class="rec-card">
        <h3>Screen Recorder</h3>
        <div class="btn-row">
          <button type="button" id="startBtn" onclick="startRec()">Start</button>
          <button type="button" id="stopBtn" onclick="stopRec()" disabled>Stop</button>
        </div>
        <span id="recStatus">Ready</span>
        <span id="timer">00:00</span>
        <br>
        <button type="button" id="downloadBtn" onclick="downloadRec()">Download</button>
        <video id="previewVideo" controls></video>
      </div>
      <script>
        var mediaRecorder, recChunks = [], recStream, recBlobUrl;
        var timerInterval, seconds = 0;

        function startRec() {
          navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
            .then(function(stream) {
              recStream = stream;
              recChunks = [];
              seconds   = 0;
              mediaRecorder = new MediaRecorder(stream);
              mediaRecorder.ondataavailable = function(e) {
                if (e.data.size > 0) recChunks.push(e.data);
              };
              mediaRecorder.onstop = function() {
                var blob  = new Blob(recChunks, { type: 'video/webm' });
                recBlobUrl = URL.createObjectURL(blob);
                var vid   = document.getElementById('previewVideo');
                vid.src   = recBlobUrl;
                vid.style.display = 'block';
                document.getElementById('downloadBtn').style.display = 'inline-block';
                document.getElementById('recStatus').textContent = 'Recording saved';
                document.getElementById('timer').style.display = 'none';
                clearInterval(timerInterval);
              };
              mediaRecorder.start(100);
              timerInterval = setInterval(function() {
                seconds++;
                var m = String(Math.floor(seconds / 60)).padStart(2, '0');
                var s = String(seconds % 60).padStart(2, '0');
                document.getElementById('timer').textContent = m + ':' + s;
              }, 1000);
              document.getElementById('startBtn').disabled  = true;
              document.getElementById('stopBtn').disabled   = false;
              document.getElementById('recStatus').textContent = 'Recording in progress...';
              document.getElementById('timer').style.display = 'block';
              document.getElementById('downloadBtn').style.display = 'none';
              document.getElementById('previewVideo').style.display = 'none';
              stream.getVideoTracks()[0].onended = stopRec;
            })
            .catch(function() {
              document.getElementById('recStatus').textContent = 'Permission denied or cancelled';
            });
        }

        function stopRec() {
          if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
          if (recStream) recStream.getTracks().forEach(function(t) { t.stop(); });
          document.getElementById('startBtn').disabled = false;
          document.getElementById('stopBtn').disabled  = true;
        }

        function downloadRec() {
          if (!recBlobUrl) return;
          var a = document.createElement('a');
          a.href = recBlobUrl;
          a.download = 'recording-' + Date.now() + '.webm';
          a.click();
        }
      <\/script>
    </body>
    </html>
  `);
  recPopup.document.close();
}
