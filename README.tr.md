# 🎬 Better & Easy PIP

Video oynatıcı için kolay Picture-in-Picture (PIP) kontrolü, şeffaflık ve ses ayarları içeren Chrome eklentisi.

> 🇬🇧 [Click here for English version](README.md)

## ✨ Özellikler

- **🎥 Tek Tıkla PIP**: Picture-in-Picture modunu anında başlatın
- **🔲 Şeffaflık Kontrolü**: Video şeffaflığını ayarlayın (%10 - %100)
- **🔊 Ses Kontrolü**: Hızlı ses ayarlama kaydırıcısı
- **🌍 Çoklu Dil**: İngilizce ve Türkçe dil desteği
- **⌨️ Klavye Kısayolları**: 
  - `Alt + P`: PIP modunu aç/kapat
  - `Alt + +`: Şeffaflığı artır
  - `Alt + -`: Şeffaflığı azalt
- **💾 Ayar Hafızası**: Tercihlerinizi otomatik kaydeder
- **🎨 Modern Arayüz**: Gradient tasarım ve akıcı animasyonlar
- **☕ Destek**: Yerleşik Buy Me a Coffee butonu

## 📦 Kurulum

### Kaynaktan (Geliştirici Modu)

1. Bu repoyu klonlayın:
   ```bash
   git clone https://github.com/sinanyuzgulec/chrome-extension-better-n-easy-pip.git
   cd chrome-extension-better-n-easy-pip
   ```

2. **İkonları Ekleyin**: 
   - PNG formatında ikonlar oluşturun veya indirin (16x16, 48x48, 128x128)
   - Bunları `icons/` klasörüne yerleştirin
   - Detaylar için [icons/README.md](icons/README.md) dosyasına bakın
   - **Kolay yol**: Proje klasöründe `icon-generator.html` dosyasını tarayıcınızda açın

3. Chrome'da `chrome://extensions/` adresine gidin

4. **Developer mode**'u (Geliştirici modu) açın (sağ üstte)

5. **Load unpacked** (Paketlenmemiş yükle) butonuna tıklayın

6. `better-n-easy-pip` klasörünü seçin

7. Hazır! Eklenti simgesi araç çubuğunuzda görünecek

### Chrome Web Store'dan

*Çok yakında...*

## 🎯 Kullanım

1. **Video içeren bir sayfaya gidin** (YouTube, Netflix, Vimeo, vb.)

2. **Araç çubuğundaki eklenti simgesine** tıklayın

3. **"PIP Modunu Aç"** butonuna tıklayın

4. **Ayarları düzenleyin**:
   - Videoyu şeffaf yapmak için şeffaflık kaydırıcısını hareket ettirin
   - Ses kaydırıcısı ile sesi ayarlayın
   - Ayarlar otomatik olarak kaydedilir!

5. **Hızlı kontrol için klavye kısayollarını** kullanın (yukarıdaki özelliklere bakın)

6. **Dil değiştirin**: Açılır menüdeki dil seçiciden İngilizce veya Türkçe seçin

## 🛠️ Teknik Detaylar

- **Manifest Versiyonu**: 3 (en son Chrome extension API)
- **İzinler**: 
  - `activeTab`: PIP kontrolü için geçerli sekmeye erişim
  - `scripting`: Video manipülasyonu için script enjeksiyonu
  - `storage`: Kullanıcı tercihlerini kaydetme
- **Desteklenen Siteler**: HTML5 video elementi olan tüm websiteleri

## 🎨 Özelleştirme

### Buy Me a Coffee Bağlantısını Değiştirme

`popup.html` dosyasının 55. satırını düzenleyin:
```html
<a href="https://www.buymeacoffee.com/yourname" target="_blank" class="coffee-button">
```

`yourname` kısmını kendi Buy Me a Coffee kullanıcı adınızla değiştirin.

### Renkleri Değiştirme

`styles.css` dosyasını düzenleyerek gradient renklerini değiştirin:
- Ana gradient: 9-10. satırlar
- Buton gradient: 45. satır

## 🐛 Sorun Giderme

**PIP butonu devre dışı mı?**
- Sayfada video elementi olduğundan emin olun
- Bazı sitelerde (Netflix gibi) kısıtlamalar olabilir
- Sayfayı yenilemeyi deneyin

**Birden fazla PIP penceresi açabilir miyim?**
- Hayır, Chrome'un PIP API'si aynı anda **sadece bir PIP penceresi** açılmasına izin verir
- Yeni bir sekmede PIP açmak önceki PIP penceresini otomatik olarak kapatır
- Bu bir tarayıcı sınırlamasıdır, extension sorunu değil

**Şeffaflık çalışmıyor mu?**
- Bazı video oynatıcılar CSS stillerini geçersiz kılabilir
- PIP modunu kapatıp yeniden açmayı deneyin
- YouTube'da en iyi çalışır

**Eklenti görünmüyor mu?**
- `icons/` klasörüne ikon dosyalarını eklediğinizden emin olun
- Chrome extensions sayfasında hata olup olmadığını kontrol edin

**Dil değişmiyor mu?**
- Popup'ı kapatıp yeniden açın
- Tarayıcı konsolunda (F12) hata olup olmadığına bakın

## 🤝 Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Lütfen Pull Request göndermekten çekinmeyin.

1. Repoyu fork edin
2. Feature branch'inizi oluşturun (`git checkout -b feature/HarikaBirOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika bir özellik ekle'`)
4. Branch'inizi push edin (`git push origin feature/HarikaBirOzellik`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT Lisansı ile lisanslanmıştır - detaylar için LICENSE dosyasına bakın.

## ☕ Destek

Bu eklentiyi faydalı bulduysanız, bana bir kahve ısmarlayabilirsiniz!

[☕ Bana Bir Kahve Ismarla](https://www.buymeacoffee.com/yourname)

> `yourname` kısmını kendi Buy Me a Coffee kullanıcı adınızla değiştirin

## 📧 İletişim

Hatalar, öneriler veya sorular için lütfen GitHub'da issue açın.

---

Daha iyi video deneyimi için ❤️ ile yapıldı
