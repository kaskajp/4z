---
layout: base.njk
title: Furigana in HTML
---

## What is furigana?

Furigana are small phonetic guides shown above (or beside) Japanese characters to indicate pronunciation. In HTML, furigana are implemented with the `ruby` family of elements.

## The `ruby` elements

- `ruby`: wraps the base text and its annotation(s)
- `rb`: optional wrapper around the base text (often omitted)
- `rt`: the ruby text (the furigana pronunciation)
- `rp`: fallback parentheses for browsers that don’t support ruby
- `rtc`: advanced: container for complex annotations

## Basic examples

Rendered:

<p>
  <ruby>漢<rt>かん</rt>字<rt>じ</rt></ruby>
</p>

Code:

```html
<ruby>漢<rt>かん</rt>字<rt>じ</rt></ruby>
```

Using `rb` to group base text with a single annotation:

Rendered:

<p>
  <ruby><rb>今日</rb><rt>きょう</rt></ruby>
</p>

Code:

```html
<ruby>
  <rb>今日</rb>
  <rt>きょう</rt>
</ruby>
```

With `rp` fallback for older browsers/screen readers that don’t support ruby:

```html
<ruby>
  <rb>東京</rb>
  <rp>(</rp><rt>とうきょう</rt><rp>)</rp>
</ruby>
```

## Accessibility notes

- Keep the base text readable without ruby; use `rp` for graceful fallback.
- Consider setting `lang="ja"` on a container so assistive tech applies Japanese rules:

```html
<p lang="ja">
  <ruby>明日<rt>あした</rt></ruby>は休みです。
</p>
```

- Screen readers vary in ruby support. Where pronunciation is critical, consider providing a plain-text reading nearby.

## Styling furigana with CSS

The default placement is usually above the base text in horizontal Japanese. You can control it with CSS:

```css
/* Place furigana above (horizontal text) or right (vertical text) */
ruby { ruby-position: over; }

/* Tweak spacing and alignment */
ruby { ruby-align: center; }
rt { font-size: 0.6em; letter-spacing: 0.05em; }
```

You generally don’t need extra markup beyond `ruby` and `rt` for simple cases. Use `rb` when grouping multiple characters that share one reading.

## More examples

Mixed kanji and kana, multiple `rt` entries:

Rendered:

<p>
  <ruby>食<rt>しょく</rt>事<rt>じ</rt>中<rt>ちゅう</rt></ruby>
</p>

Code:

```html
<ruby>
  食<rt>しょく</rt>事<rt>じ</rt>中<rt>ちゅう</rt>
</ruby>
```

## References

- MDN: Ruby annotation — `https://developer.mozilla.org/docs/Web/HTML/Element/ruby`


