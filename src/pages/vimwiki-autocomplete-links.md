---
title: VimWiki Autocomplete Links
---

# VimWiki Autocomplete Links

This is a custom completion function for Vimwiki links. It allows you to autocomplete links by pressing Ctrl-Space.

E.g. type `[[Debian` and press Ctrl-Space to open the autocomplete menu. Use arrow up/down to choose and press enter. Enter appends ]] to complete the link.

Note: It does not fuzzy match, in my example above, it will match "Debian Setup Guide" but not "My great Debian Setup Guide".

```vim
" Autocomplete links in Vimwiki ([[go..)
" Press ctrl-space to open autocomplete menu, use arrow up/down
" to choose and press enter. Enter appends ]] to complete the link.
augroup VimwikiLinkCompletion
  autocmd!
  " Use our custom completion function in vimwiki buffers
  autocmd FileType vimwiki setlocal completefunc=VimwikiLinkComplete

  " Popup menu behavior (optional but nice)
  autocmd FileType vimwiki setlocal completeopt=menuone

  " Ctrl-Space triggers vimwiki completion
  autocmd FileType vimwiki inoremap <buffer> <C-Space> <C-x><C-u>

  " When popup is visible:
  "   <CR> = accept current item + append ]]
  " When popup is not visible:
  "   <CR> = normal newline
  autocmd FileType vimwiki inoremap <expr><buffer> <CR> pumvisible()
        \ ? "\<C-y>]]"
        \ : "\<CR>"
augroup END

" When popup menu is visible, make <Down>/<Up> behave like <C-n>/<C-p>
inoremap <expr> <Down> pumvisible() ? "\<C-n>" : "\<Down>"
inoremap <expr> <Up>   pumvisible() ? "\<C-p>" : "\<Up>"
```
