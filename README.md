# Aşkım, Bir Barışalım mı? ❤️

Ümmühan'a özel, mobil uyumlu ve tamamen statik romantik bir web sitesi.

## Klasör yapısı

```text
.
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── images/
    └── audio/
```

## Kişiselleştirme

### Fotoğraflar

1. Kendi dört fotoğrafını `assets/images/` klasörüne kopyala.
2. Dosya adlarını sırasıyla `foto1.jpg`, `foto2.jpg`, `foto3.jpg`, `foto4.jpg` yap.
3. Farklı dosya adı veya uzantı kullanırsan `index.html` içindeki ilgili `src` değerlerini güncelle.

Fotoğraf eklenmediğinde sayfa kırık görsel göstermez; bunun yerine zarif bir yer tutucu görünür. Fotoğrafa dokununca büyük görüntüleme penceresi açılır.

### Şarkı

Site, klasördeki sabit müzik dosyasını kullanır. MP3 dosyanı `assets/audio/sarkim.mp3` adıyla ekle. Mektup açıldığında şarkı başlar; istersen oynatıcıdan duraklatabilirsin.

Farklı bir dosya adı kullanmak istersen `script.js` içindeki `DEFAULT_SONG_PATH` değerini değiştir:

```js
const DEFAULT_SONG_PATH = "assets/audio/sarkim.mp3";
```

## Bilgisayarda çalıştırma

Dosyayı doğrudan çift tıklayarak da açabilirsin. Daha sağlıklı bir yerel önizleme için proje klasöründe bir terminal açıp şu komutlardan birini çalıştır:

### Python yüklüyse

```bash
python -m http.server 5500
```

Sonra tarayıcıdan `http://localhost:5500` adresini aç.

### VS Code kullanıyorsan

Live Server eklentisini kurup `index.html` dosyasına sağ tıklayarak **Open with Live Server** seçebilirsin.

## İnternette yayınlama

### GitHub Pages

1. Bu klasörü bir GitHub reposuna yükle.
2. Repo ayarlarında **Settings → Pages** bölümünü aç.
3. Kaynak olarak `main` dalını ve `/root` klasörünü seç.
4. GitHub birkaç dakika içinde paylaşılabilir bir adres oluşturur.

### Netlify

1. [netlify.com](https://www.netlify.com/) sitesine git.
2. Klasörü **Deploy manually** alanına sürükle veya GitHub reposuna bağla.
3. Yayınlanan adresi istersen Netlify ayarlarından değiştirebilirsin.

## Notlar

- Site hiçbir kişisel fotoğrafı veya bilgiyi kendiliğinden uydurmaz.
- Gizli kalpler, mektup, hediye kutusu, sevgi cümleleri ve iki final seçeneği isteğe bağlıdır; kullanıcı hiçbirini açmaya zorlanmaz.
- Sayaç 20 Şubat 2026 tarihinden itibaren gerçek zamanlı çalışır.
- `prefers-reduced-motion` desteği sayesinde cihaz animasyonları azaltmayı tercih ediyorsa hareketler sakinleşir.
