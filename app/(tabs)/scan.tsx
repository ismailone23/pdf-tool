// import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'

// export default function scan() {
//     const [permission, requestPermission] = useCameraPermissions()
//     const [facing, setFacing] = useState<CameraType>('back');

//     if (!permission) return <View />
//     if (!permission.granted) {
//         return (
//             <View className='w-full h-full flex items-center justify-center'>
//                 <TouchableHighlight className='bg-blue-500' onPress={requestPermission}><Text>Open Camera</Text></TouchableHighlight>
//             </View>
//         )
//     }
//     function toggleCameraFacing() {
//         setFacing(current => (current === 'back' ? 'front' : 'back'));
//     }
//     return (
//         <View>
//             <CameraView facing='back' style={styles.camera}>
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//                         <Text style={styles.text}>Flip Camera</Text>
//                     </TouchableOpacity>
//                 </View>
//             </CameraView>
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     camera: {
//         flex: 1,
//     },
//     buttonContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         backgroundColor: 'transparent',
//         margin: 64,
//     },
//     button: {
//         flex: 1,
//         alignSelf: 'flex-end',
//         alignItems: 'center',
//     },
//     text: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: 'white',
//     },
// });

import { View, Text } from 'react-native'
import React from 'react'

export default function Scan() {
    return (
        <View>
            <Text>Scan</Text>
        </View>
    )
}