import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Returns a picture element with webp and fallbacks
 * @param {string} src The image URL
 * @param {string} [alt] The image alternative text
 * @param {boolean} [eager] Set loading attribute to eager
 * @param {Array} [breakpoints] Breakpoints and corresponding params (eg. width)
 * @returns {Element} The picture element
 */
// function createOptimizedPicture(
//   src,
//   alt = '',
//   eager = false,
//   breakpoints = [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }],
// ) {
//   const url = new URL(src, window.location.href);
//   const picture = document.createElement('picture');
//   let { pathname } = url;
//   const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

//   pathname = pathname.replace('/content/citigroup', '');

//   // webp
//   breakpoints.forEach((br) => {
//     const source = document.createElement('source');
//     if (br.media) source.setAttribute('media', br.media);
//     // source.setAttribute('type', 'image/webp');
//     // source.srcset = '';//`${url}?width=${br.width}&format=webply&optimize=medium`;
//     source.setAttribute('srcset', `${pathname}?width=${br.width}&format=webply&optimize=medium`);
//     picture.appendChild(source);
//     console.log(source);
//   });

//   // fallback
//   breakpoints.forEach((br, i) => {
//     if (i < breakpoints.length - 1) {
//       const source = document.createElement('source');
//       if (br.media) source.setAttribute('media', br.media);
//       source.setAttribute('srcset', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
//       picture.appendChild(source);
//     } else {
//       const img = document.createElement('img');
//       img.setAttribute('loading', eager ? 'eager' : 'lazy');
//       img.setAttribute('alt', alt);
//       picture.appendChild(img);
//       img.setAttribute('src', `${url}?width=${br.width}&format=${ext}&optimize=medium`);
//     }
//   });

//   return picture;
// }

export function createHTML(articles) {
  const updatedArticles = [];
  const aemInstance = 'https://author-p101152-e938206.adobeaemcloud.com';

  articles.forEach((article) => {
    const optimizedPic = createOptimizedPicture(aemInstance + article.banner.dynamicUrl, article.title, true);
      optimizedPic.querySelectorAll('source').forEach((s) => {
        // s.srcset = aemInstance + s.srcset;
    });

    console.log(optimizedPic);

    updatedArticles.push(`
      <div class="article-container">
        <div class="article-img-wrapper">${optimizedPic.outerHTML}</div>
        <div class="article-info-wrapper">
          <div class="categories-text">${article.categories}</div>
          <h3>${article.title}</h3>
          <div class="article-date">${article.date}</div>
        </div>
      </div>
    `);
  });

  return updatedArticles;
}