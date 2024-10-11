document.getElementById("pickColor").addEventListener("click", async () => {
    try {
      const eyedropper = new EyeDropper();
      const result = await eyedropper.open();
      
      const color = result.sRGBHex;
  
      // Update the display with the picked color
      document.getElementById("colorDisplay").style.backgroundColor = color;
      document.getElementById("colorValue").textContent = color;
  
      // Update HEX and CSS values
      const rgb = hexToRgb(color);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      document.getElementById("hexValue").textContent = color;
      document.getElementById("hslValue").textContent = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
      document.getElementById("cssValue").textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  
    } catch (err) {
      console.error('Error using the EyeDropper API: ', err);
    }
  });
    
  // Function to activate the EyeDropper
  function activateColorPicker() {
    console.log("Activating color picker...");
    const eyedropper = new EyeDropper();
    return eyedropper.open().then(result => {
      return result.sRGBHex; // return the selected color in HEX format
    }).catch(err => {
      console.error('Error using the EyeDropper API: ', err);
    });
  }
  
  // Helper functions to convert colors
  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }
  
  function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }
