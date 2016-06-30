# Functionality
- [ ] save open channels
  - [ ] and log them?
- [ ] add a functional character menu
  - [ ] ignore
  - [ ] report (low priority)
  - [x] open private chat tabs
  - [x] link to character's profile
  - [x] bookmark
  - [x] show friendship status & reflect it in the options
  - [ ] ~~add friend~~ accidentally adding someone will be awkward
- [ ] sort the user list alphabetically, with precedence:
  - [ ] friends (green highlight)
  - [ ] bookmarks (blue highlight)
  - [ ] admins (red highlight)
  - [ ] looking
  - [ ] rest
- [ ] render ads
- [ ] add a global character list, with friends sorted to top
- [ ] add a BBCode toolbar for the chatbox

# UX / Styling
- [ ] add a waiting status screen for logging in
- [ ] add a plus button to the tab bar for a server list shortcut
- [ ] add close buttons for the tabs
- [ ] add dividers to split up the interface a bit
- [ ] look into darklighting OOC?
- [ ] on application start, scroll the character list down so the selected character is within view
- [ ] remove window border, add custom window buttons
- [ ] add a checkbox Vue component for easy styling
- [ ] make the tabs reorderable... ugh
- [ ] translate statuses into human readable text in CharacterMenu
- [x] fix the private chat view
- [x] TRANSITIONS
- [x] add hover-darken to character list items

# Optimization / Cleanup
- [ ] use computed() less, wherever possible
- [ ] find a way to solve the bottleneck rendering 400~500 character elements at once
- [ ] holy memory usage batman
- [ ] move user / session storage to an offline JSON config file
- [ ] return a null character from the store to handle offline users
- [x] ~~find a better way to organize chat tabs declaratively~~ just using events and not being stupid with focusing works
- [x] make a file for reference events that pass through the program
- [x] move to electron
