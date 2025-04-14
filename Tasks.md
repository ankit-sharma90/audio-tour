#### Task 1: setup project
- 50 landmarks listed in readme
- only first feature (audio tour)
- webapp to start, then maybe native mobile apps in the future
- placeholders where needed
- want to spend zero (or very little) on tech stack, so use free tiers where possible
- design for mobile web first

#### Task 2: add sample content
- Important: clarify any ambiguity before writing code
- write sample content (text) for each of the landmarks
- also implement any landmarks that don't exist
- write it in english
- have two versions, a 2 minute transcript (by reading time) and a 10 minute read time, for each landmark
- placeholders where needed
- design for mobile web first
- Important: confirm any ambiguitycd audio-tour-app/client

#### Task 3: optimize for mobile web
- use examples of good mobile web applications as inspiration
- make the text readable
- ensure most important elements are above the scroll line
- ensure there is not too much padding

#### Task 4: further optimizations to the landmark webpage
- ensure that in a mobile view for most phone resolutions, that a summary paragraph is visible above ths scroll line (implicit)
    - remove the first header
    - remove the first image too
    - theres too much padding on the sides

#### Task 5: text to speech
- convert existing text into audio files
- ensure approach allows for quick prototyping
- dont spend more than $10
- ensure the voices sound realistic

#### Precommit checks
##### Precommit check 1: security issues
- check for any security issues in the project
- fix any critical issues
- ensure there is no regression to functionality

##### Precommit check 2: unit test coverage
- check unit test coverage for the project
- add test coverage for any new changes since the last commit
- include net new code and updates to existing tests
- ensure you look for edge cases

##### Precommit check 3: accessibility
- check that new code does not have any accessibility issues
- install necssary plugins as needed

##### Precommit check 4: documentation
- update documentation
- check inline comments
- update Readme as needd
- update changelong
- return a git commit message