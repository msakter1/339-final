document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------BUTTONS----------------------------------
    // -----------------------------------------------------------------------

    // full screen button
    document.getElementById('fullscreenBtn').addEventListener('click', () => {
        if(!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    
    // theme button
    const videoSelectBtn = document.getElementById('videoSelectBtn');
    const themePanel = document.getElementById('themePanel');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const closePanelBtn = document.getElementById('closePanelBtn');

    videoSelectBtn.addEventListener('click', () => {
        themePanel.classList.toggle('show');
        document.body.classList.toggle('panel-open');
    });

    closePanelBtn.addEventListener('click', () => {
        themePanel.classList.remove('show');
        document.body.classList.remove('panel-open');
    });

    document.addEventListener('click', (e) => {
        if (themePanel.classList.contains('show')) {
            if (!themePanel.contains(e.target) && !videoSelectBtn.contains(e.target)) {
                themePanel.classList.remove('show');
                document.body.classList.remove('panel-open');
            }
        }
    });

    document.querySelectorAll('.theme-item').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            const src = item.getAttribute('data-src');
    
            if(type === "color") {
                backgroundVideo.style.display = "none";
                document.body.style.background = src;
            } else if(type === "photo") {
                backgroundVideo.style.display = "none";
                document.body.style.background = `url(${src}) center/cover no-repeat`;
            } else if(type === "video") {
                backgroundVideo.style.display = "block";
                backgroundVideo.src = src;
                backgroundVideo.load();
                backgroundVideo.play();
                document.body.style.background = "none"; // remove static background
            }
        });
    });

    document.querySelectorAll('.theme-item').forEach(item => {
        item.addEventListener('click', () => {
          // Remove active class from siblings
          document.querySelectorAll('.theme-item').forEach(el => el.classList.remove('active'));
          // Add to clicked item
          item.classList.add('active');
          // Set background (example)
          const src = item.dataset.src;
          if (item.dataset.type === 'video') {
            document.body.style.background = `url(${src})`;
          }
        });
      });


    
    const musicBtn = document.getElementById('musicBtn');
    const musicPanel = document.getElementById('musicPanel');
    const closeMusicPanel = document.getElementById('closeMusicPanel');

    const soundBtn = document.getElementById('soundBtn');
    const soundPanel = document.getElementById('soundPanel');
    const closeSoundPanel = document.getElementById('closeSoundPanel');



    // music button
    musicBtn.addEventListener('click', () => {
        musicPanel.classList.toggle('show');
        document.body.classList.toggle('panel-open');
    });
 
    closeMusicPanel.addEventListener('click', () => {
        musicPanel.classList.remove('show');
        document.body.classList.remove('panel-open');
    });

    document.addEventListener('click', (e) => {
        if (musicPanel.classList.contains('show')) {
            if (!musicPanel.contains(e.target) && !musicBtn.contains(e.target)) {
                musicPanel.classList.remove('show');
                document.body.classList.remove('panel-open');
            }
        }
    });

    // current music
    document.addEventListener('DOMContentLoaded', () => {
        const nowPlaying = document.getElementById('nowPlaying');
        const iframes = document.querySelectorAll('#musicPanel iframe');

        iframes.forEach((iframe) => {
            iframe.style.cursor = 'pointer';

            iframe.addEventListener('click', () => {
                console.log('click works');
                const cloned = iframe.cloneNode(true);
                cloned.style.marginTop = '10px';
                nowPlaying.innerHTML = '';
                nowPlaying.appendChild(cloned);
            });
        });
    });



    // Sound button
    soundBtn.addEventListener('click', () => {
        soundPanel.classList.toggle('show');
        document.body.classList.toggle('panel-open');
    });
 
    closeSoundPanel.addEventListener('click', () => {
        soundPanel.classList.remove('show');
        document.body.classList.remove('panel-open');
    });

    document.addEventListener('click', (e) => {
        if (soundPanel.classList.contains('show')) {
            if (!soundPanel.contains(e.target) && !soundBtn.contains(e.target)) {
                soundPanel.classList.remove('show');
                document.body.classList.remove('panel-open');
            }
        }
    });

});