# 🎬 Better & Easy PIP

Chrome extension for easy Picture-in-Picture control with transparency and volume adjustments.

> 🇹🇷 [Türkçe versiyon için tıklayın](README.tr.md)

## ✨ Features

- **🎥 One-Click PIP**: Start Picture-in-Picture mode instantly
- **🔲 Transparency Control**: Adjust video transparency (10% - 100%)
- **🔊 Volume Control**: Quick volume adjustment slider
- **🌍 Multi-Language**: English and Turkish language support
- **⌨️ Keyboard Shortcuts**: 
  - `Alt + P`: Toggle PIP mode
  - `Alt + +`: Increase transparency
  - `Alt + -`: Decrease transparency
- **💾 Settings Memory**: Automatically saves your preferences
- **🎨 Beautiful UI**: Modern gradient design with smooth animations
- **☕ Support Development**: Built-in Buy Me a Coffee button

## 📦 Installation

### From Source (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/sinanyuzgulec/chrome-extension-better-n-easy-pip.git
   cd chrome-extension-better-n-easy-pip
   ```

2. **Add Icons**: 
   - Create or download PNG icons (16x16, 48x48, 128x128)
   - Place them in the `icons/` folder
   - See [icons/README.md](icons/README.md) for details

3. Open Chrome and navigate to `chrome://extensions/`

4. Enable **Developer mode** (toggle in top-right)

5. Click **Load unpacked**

6. Select the `better-n-easy-pip` folder

7. Done! The extension icon will appear in your toolbar

### From Chrome Web Store

*Coming soon...*

## 🎯 Usage

1. **Navigate to any page with video** (YouTube, Netflix, Vimeo, etc.)

2. **Click the extension icon** in your toolbar

3. **Click "PIP Modunu Aç"** to start Picture-in-Picture

4. **Adjust settings**:
   - Move the transparency slider to make video transparent
   - Adjust volume with the volume slider
   - Settings are automatically saved!

5. **Use keyboard shortcuts** for quick control (see features above)

## 🛠️ Technical Details

- **Manifest Version**: 3 (latest Chrome extension API)
- **Permissions**: 
  - `activeTab`: Access current tab for PIP control
  - `scripting`: Inject scripts for video manipulation
  - `storage`: Save user preferences
- **Supported Sites**: All websites with HTML5 video elements

## 🎨 Customization

### Change Buy Me a Coffee Link

Edit `popup.html` line 51:
```html
<a href="https://www.buymeacoffee.com/yourname" target="_blank" class="coffee-button">
```

Already configured with your Buy Me a Coffee link!

### Modify Colors

Edit `styles.css` to change the gradient colors:
- Main gradient: Lines 9-10
- Button gradient: Line 45

## 🐛 Troubleshooting

**PIP button is disabled?**
- Make sure the page has a video element
- Some sites (like Netflix) may have restrictions
- Try refreshing the page

**Can I have multiple PIP windows open?**
- No, Chrome's PIP API only allows **one PIP window at a time**
- Opening PIP in a new tab will automatically close the previous PIP window
- This is a browser limitation, not an extension issue

**Transparency not working?**
- Some video players override CSS styles
- Try closing and reopening PIP mode

**Extension not appearing?**
- Make sure you've added the icon files to the `icons/` folder
- Check Chrome extensions page for errors
**Store Screenshots Error?**
- Screenshots must be 1280x800 or 640x400 pixels
- PNG or JPG format only
## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ☕ Support

If you find this extension helpful, consider buying me a coffee!

[☕ Buy Me a Coffee](https://www.buymeacoffee.com/yourname)

> Replace `yourname` with your own Buy Me a Coffee username

## 📧 Contact

For bugs, suggestions, or questions, please open an issue on GitHub.

---

Made with ❤️ for better video experience
