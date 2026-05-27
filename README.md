# Bike-Light

Bike Light makes cycling safer by turning your ride into a light show. The app reads speed, acceleration, and direction from your phone and translates them into real-time LED patterns on lights mounted to your bike — the harder you push, the more dramatic the display.

The UI is built for one-handed use on a bike: all key controls live at the bottom of the screen. The lights give clear feedback when pairing, disconnecting, or searching so you're never left guessing.

Built with React Native (iOS + Android from a single codebase). The LED microcontrollers run Arduino C++. Companion embedded firmware lives in [Lightbike_Embedded](https://github.com/andyklenzman/Lightbike_Embedded).

```bash
npm install
npx react-native run-ios
```
