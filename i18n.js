// Internationalization (i18n) support
const translations = {
  en: {
    title: '🎬 Better & Easy PIP',
    pipButtonOpen: 'Open PIP Mode',
    pipButtonClose: 'Close PIP Mode',
    transparency: 'Transparency',
    volume: 'Volume',
    statusNoVideo: 'No video found or PIP not supported',
    statusVideoReady: 'Video ready - PIP can be started',
    statusPipActive: 'PIP mode active',
    statusPipStarted: 'PIP mode started ✓',
    statusPipClosed: 'PIP mode closed',
    statusError: 'Error: ',
    statusNoVideoOnPage: 'No video found on this page',
    statusNotSupported: 'PIP not supported for this video',
    statusPipLimit: 'Note: Only 1 PIP window can be open at a time',
    statusPipSwitched: 'PIP switched to this tab ✓',
    supportText: 'Do you like this extension?',
    buyMeCoffee: 'Buy Me a Coffee',
    footer: 'Made with ❤️ for better video experience',
    language: 'Language',
    infoSinglePip: 'Chrome allows only one PIP window at a time. Opening PIP here will close any other PIP window.'
  },
  tr: {
    title: '🎬 Better & Easy PIP',
    pipButtonOpen: 'PIP Modunu Aç',
    pipButtonClose: 'PIP Modunu Kapat',
    transparency: 'Şeffaflık',
    volume: 'Ses',
    statusNoVideo: 'Video bulunamadı veya PIP desteklenmiyor',
    statusVideoReady: 'Video hazır - PIP başlatılabilir',
    statusPipActive: 'PIP modu aktif',
    statusPipStarted: 'PIP modu başlatıldı ✓',
    statusPipClosed: 'PIP modu kapatıldı',
    statusError: 'Hata: ',
    statusNoVideoOnPage: 'Bu sayfada video bulunamadı',
    statusNotSupported: 'PIP bu video için desteklenmiyor',
    statusPipLimit: 'Not: Aynı anda sadece 1 PIP penceresi açılabilir',
    statusPipSwitched: 'PIP bu sekmeye geçti ✓',
    supportText: 'Bu eklentiyi beğendiniz mi?',
    buyMeCoffee: 'Bana Bir Kahve Ismarla',
    footer: 'Daha iyi video deneyimi için ❤️ ile yapıldı',
    language: 'Dil',
    infoSinglePip: 'Chrome aynı anda sadece bir PIP penceresi açılmasına izin verir. Buradan PIP açmak diğer PIP penceresini kapatacaktır.'
  }
};

// Get current language
function getCurrentLanguage() {
  return localStorage.getItem('pip-language') || 'en';
}

// Set language
function setLanguage(lang) {
  localStorage.setItem('pip-language', lang);
  applyTranslations(lang);
}

// Get translation
function t(key, lang = null) {
  const currentLang = lang || getCurrentLanguage();
  return translations[currentLang]?.[key] || translations['en'][key] || key;
}

// Apply translations to DOM
function applyTranslations(lang) {
  const trans = translations[lang] || translations['en'];
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (trans[key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
        element.value = trans[key];
      } else {
        element.textContent = trans[key];
      }
    }
  });
  
  // Update language selector
  const langSelector = document.getElementById('languageSelector');
  if (langSelector) {
    langSelector.value = lang;
  }
}

// Initialize i18n
function initI18n() {
  const currentLang = getCurrentLanguage();
  applyTranslations(currentLang);
  
  // Set up language selector
  const langSelector = document.getElementById('languageSelector');
  if (langSelector) {
    langSelector.value = currentLang;
    langSelector.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }
}
