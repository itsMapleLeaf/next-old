# Functionality
- [ ] save open channels
  - [ ] and log them?
- [ ] add a functional character menu
  - [ ] open private chat tabs
  - [ ] link to character's profile
  - [ ] add friend
  - [ ] ignore
  - [ ] bookmark
  - [ ] report (low priority)
- [ ] sort the user list alphabetically, with precedence:
  - [ ] friends (green highlight)
  - [ ] bookmarks (blue highlight)
  - [ ] admins (red highlight)
  - [ ] looking
  - [ ] rest
- [ ] render ads
- [ ] add a global character list, with friends sorted to top

# UX / Styling
- [ ] add a waiting status screen for logging in
- [ ] add a plus button to the tab bar for a server list shortcut
- [ ] add dividers to split up the interface a bit
- [ ] look into darklighting OOC?
- [ ] on application start, scroll the character list down so the selected character is within view
- [ ] remove window border, add custom window buttons
- [x] TRANSITIONS
- [x] add hover-darken to character list items

# Optimization / Cleanup
- [ ] use computed() less, wherever possible
- [ ] find a way to solve the bottleneck rendering 400~500 character elements at once
- [ ] holy memory usage batman
- [ ] move user / session storage to an offline JSON config file
- [x] move to electron
