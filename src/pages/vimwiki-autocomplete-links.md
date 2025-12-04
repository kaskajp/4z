---
title: VimWiki Autocomplete Links
---

# VimWiki Autocomplete Links

**UPDATE December 4, 2025**: This is just an early version of a plugin. See [VimWiki Autocomplete Links](https://github.com/kaskajp/vimwiki-autocomplete-links) for the latest version.

This is a custom completion function for Vimwiki links. It allows you to autocomplete links by pressing Ctrl-Space.

E.g. type `[[Debian` and press Ctrl-Space to open the autocomplete menu. Use arrow up/down to choose and press enter. Enter appends ]] to complete the link.

Note: It does not fuzzy match, in my example above, it will match "Debian Setup Guide" but not "My great Debian Setup Guide". Also replace `~/yourwiki/` with the path to your wiki.

Add this to your `.vimrc` file:

```vim
function! VimwikiLinkComplete(findstart, base) abort
  " 1) Find where completion starts
  if a:findstart
    let line = getline('.')
    let col = col('.') - 1

    " Walk backwards to find [[
    while col > 1
      if line[col - 1] == '[' && line[col - 2] == '['
        " Completion starts right after [[
        return col
      endif
      let col -= 1
    endwhile

    return -1
  endif

  " 2) Build completion list
  let base = a:base
  let wiki = get(g:vimwiki_list, 0, {})
  let root = expand(get(wiki, 'path', '~/yourwiki/'))
  let ext  = get(wiki, 'ext', '.md')

  " Find all wiki files
  let files = split(globpath(root, '**/*' . ext), '\n')
  let res = []

  for f in files
    " Use filename without extension, e.g. note.md -> note
    let name = fnamemodify(f, ':t:r')

    " Only include names that start with what you've typed
    if name =~? '^' . escape(base, '.*$^~\')
      call add(res, name)
    endif
  endfor

  return res
endfunction

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
