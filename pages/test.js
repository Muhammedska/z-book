  
// Ekran kesiti alma işlemini başlatan fonksiyon
async function startScreenCapture() {
    try {
      // Ekran kesiti alma iznini isteyin
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  
      // Video öğesini oluşturun ve ekran kesiti akışını atayın
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
  
      // Ekran kesitini yakalamak için bir canvas oluşturun
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      // Video oynatıldığında canvas'a karesini çizin
      videoElement.addEventListener('play', () => {
        const width = videoElement.videoWidth;
        const height = videoElement.videoHeight;
        canvas.width = width;
        canvas.height = height;
  
        setInterval(() => {
          context.clearRect(0, 0, width, height);
          context.drawImage(videoElement, 0, 0, width, height);
  
          // Canvas'tan veriyi alın
          const imageData = canvas.toDataURL('image/png');
  
          // Veriyi kullanmak için burada yapabilirsiniz (örneğin, göndermek veya indirmek)
          console.log(imageData);
        }, 1000 / 30); // Örneğin, 30 FPS ile 1 saniyede 30 kare alınacak
      });
    } catch (error) {
      console.error('Ekran kesiti alınamadı:', error);
    }
  }
  
  // Ekran kesiti alma işlemini başlatın
  startScreenCapture();