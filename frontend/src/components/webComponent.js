import React from "react";
import Svg, {
  Defs,
  Pattern,
  Image,
  ClipPath,
  Rect,
  G,
  Text,
  TSpan,
  Circle
} from "react";
/* Adobe XD React Exporter has dropped some elements not supported by react-native-svg: style */

const WebComponent = () => (
  <Svg width={1920} height={1080} viewBox="0 0 1920 1080">
    <Defs>
      <Pattern
        id="a"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        viewBox="0 0 1651 1101"
      >
        <Image
          width={1651}
          height={1101}
          xlinkHref="ComponentTMP_2-image.jpg"
        />
      </Pattern>
      <ClipPath id="c">
        <Rect width={1920} height={1080} />
      </ClipPath>
    </Defs>
    <G id="b" className="a">
      <Rect className="j" width={1920} height={1080} />
      <Rect
        className="b"
        width={1920.5}
        height={1120.5}
        transform="translate(0 -20)"
      />
      <Text className="c" transform="translate(624 201)">
        <TSpan x={0} y={0}>
          {"What is your level of activity?"}
        </TSpan>
      </Text>
      <G className="d" transform="translate(727 655)">
        <Rect className="h" width={466} height={94} />
        <Rect className="i" x={0.5} y={0.5} width={465} height={93} />
      </G>
      <G className="d" transform="translate(727 541)">
        <Rect className="h" width={466} height={94} />
        <Rect className="i" x={0.5} y={0.5} width={465} height={93} />
      </G>
      <G className="d" transform="translate(727 426)">
        <Rect className="h" width={466} height={94} />
        <Rect className="i" x={0.5} y={0.5} width={465} height={93} />
      </G>
      <Text className="e" transform="translate(784 484)">
        <TSpan x={0} y={0}>
          {"Not active"}
        </TSpan>
      </Text>
      <Text className="e" transform="translate(784 599)">
        <TSpan x={0} y={0}>
          {"Exercise 1-3 times"}
        </TSpan>
      </Text>
      <Text className="e" transform="translate(784 713)">
        <TSpan x={0} y={0}>
          {"Workout every day"}
        </TSpan>
      </Text>
      <G className="f" transform="translate(1142 467)">
        <Circle className="h" cx={8} cy={8} r={8} />
        <Circle className="i" cx={8} cy={8} r={7.5} />
      </G>
      <G className="f" transform="translate(1142 694)">
        <Circle className="h" cx={8} cy={8} r={8} />
        <Circle className="i" cx={8} cy={8} r={7.5} />
      </G>
      <G className="f" transform="translate(1142 581)">
        <Circle className="h" cx={8} cy={8} r={8} />
        <Circle className="i" cx={8} cy={8} r={7.5} />
      </G>
      <G transform="translate(-2 -27)">
        <Rect width={199} height={63} transform="translate(1617 935)" />
        <Text className="g" transform="translate(1685 976)">
          <TSpan x={0} y={0}>
            {"NEXT"}
          </TSpan>
        </Text>
      </G>
    </G>
  </Svg>
);

export default WebComponent;
