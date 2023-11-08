#### Bikers Have A Problem
Biking is fun, good for your health, and good for the environment. However, there is a real danger of being hit by a car because of low-visibility when biking in the city. Putting lights can make biking in the city safe again, and I wanted to see if I could build an application that encouraged more people to put lights on their bike.

#### Make Biking Safe by Making It More Fun
Bike Light is a mobile application that makes biking safer by making it more fun. It uses the speed, acceleration, and direction measured by your phone to control an interactive light show displayed on LEDS. Users who install the lights onto their bike have an enhanced sense of joy while riding their bike because they can create a lightshow through their own biking style, while also increasing their visibility to cars.

<iframe width="560" height="315" src="https://www.youtube.com/embed/lT3SwKlmAvs?si=ymLLxO1nV6FxacOj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

I designed Bike Light’s user interface to be easy to use on a bike. All of the key controls are on the bottom of the screen, so you can pair up your lights or change your settings with one hand. The app and lights give users clear feedback when the lights have paired, disconnected, loading or searching, so they never feel lost. Here are some screenshots of UI pairing over bluetooth to the lights:

![Text {200x100}](/imgs/bikelight/bikelightUIScanning.PNG)
![Text {200x100}](/imgs/bikelight/bikelightUI.PNG)

Later in the development of the app, I ran into the problem that iOS does not allow the bluetooth I needed to run in the background. This means the user can not turn off their phone screen while using the app. This was a big blow, but I adapted by making the color of the screen responsive to movement as well, and built a curtain that would 'lock' the screen, preventing any accidental button pushes. Check out the UI in this video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/jX39QiVEQ6s?si=O9eBbEQIX8TFMghY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


The Bike Light App is developed using the cross-platform mobile application framework React Native, allowing a single Javascript codebase to be used for both our Android and iOS mobile applications. The microcontrollers for the LEDs are programmed using Arduino’s variation of the C++ coding language.

As of now, I leaving the project to the side to work on other things. To distribute this app, I would need to build out the manufacturing for the light kit, which is something I don't have the time to do right now. Either way, I absolutely loved building this app and it taught me about mobile and embedded development. It also taught me the benefits of focusing on software products that don't require extra hardware, because this extra step requires a lot more energy to distribute a project.


