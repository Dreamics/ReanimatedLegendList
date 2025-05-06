import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimatedLegendList } from '@legendapp/list/reanimated';
import DragableItem from '../../components/DraggableItem'; 

const dummyData = Array.from({ length: 5 }, (_, i) => ({ 
    id: `${i}`,
}));

export default function DragListScreen() {

    return (
        <View style={styles.container}>
            <AnimatedLegendList
                data={dummyData}
                keyExtractor={(item) => item.id}
                numColumns={1}
                recycleItems
                renderItem={({ item }) => (
                    <DragableItem
                        item={item}
                        onPress={() => {
                            console.log('Item pressed:', item.id);
                        }}
                    />
                )}
              
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
