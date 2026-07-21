# NEWSEN — VR 기기 추천 홈페이지

순수 HTML / CSS / JavaScript 반응형 웹페이지입니다. 빌드 도구 없이 GitHub Pages에 바로 배포할 수 있습니다.

## 구조

```
├── index.html      # 메인 페이지
├── css/
│   └── styles.css  # 스타일
└── js/
    └── main.js     # 인터랙션 (캐러셀, 메뉴, FAQ, 모달 등)
```

## 로컬에서 보기

`index.html`을 브라우저로 열거나, 간단한 로컬 서버를 사용하세요.

```bash
# Python
python -m http.server 5500

# Node (npx)
npx serve .
```

## GitHub Pages 배포

1. 이 폴더를 GitHub 저장소에 푸시합니다.
2. **Settings → Pages**
3. **Source**: Deploy from a branch
4. **Branch**: `main` (또는 `master`) / `/ (root)`
5. Save 후 잠시 기다리면  
   `https://<username>.github.io/<repository-name>/` 에서 확인할 수 있습니다.

> Project Pages인 경우 저장소 루트에 `index.html`이 있어야 합니다. (현재 구조 그대로 사용)
