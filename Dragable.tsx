import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { Pressable } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';

type DraggableItemProps = {
    item: {
        id: string;
    };
    onPress: () => void;
};

const DraggableItem: React.FC<DraggableItemProps> = ({ onPress }) => {
    const isActive = useSharedValue(false);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const scale = useSharedValue(1);

    const longPress = Gesture.LongPress()
        .minDuration(150)
        .onStart(() => {
            isActive.value = true;
            scale.value = withSpring(0.9);
        });

    const pan = Gesture.Pan()
        .onUpdate(e => {
            if (!isActive.value) return;
            offsetX.value = e.translationX;
            offsetY.value = e.translationY;
        })
        .onEnd(() => {
            if (!isActive.value) return;
            offsetX.value = withSpring(0);
            offsetY.value = withSpring(0);
        })
        .onFinalize(() => {
            isActive.value = false;
            scale.value = withSpring(1);
        });

    const gesture = Gesture.Race(
        Gesture.Simultaneous(longPress, pan),
        Gesture.Native()
    );

    const style = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateX: offsetX.value },
            { translateY: offsetY.value },
        ],
        zIndex: isActive.value ? 1 : 0,
        opacity: isActive.value ? 0.85 : 1,
    }));

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={style}>
                <Pressable onPress={onPress} style={styles.item}>
                    <View style={styles.grayBox} />
                </Pressable>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#1D1D1D',
        margin: 6,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    grayBox: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#888',
        borderRadius: 8,
    },
});

export default DraggableItem;
