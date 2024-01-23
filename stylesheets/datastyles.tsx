import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1, 
        borderWidth: 1, 
        borderColor: 'black',
        padding: 30,
    },
    middleContainer: {
        alignItems: "center",
        margin: 5,
        borderWidth: 1, 
        borderColor: 'black',
        backgroundColor: "lightblue",
        padding:10,
        borderRadius: 20
    },
    innerContainer: {
        alignItems: "center",
        borderWidth: 1, 
        borderColor: 'black',
        margin: 5,
        backgroundColor: "white",
        padding: 10,
        width: 250,
        borderRadius: 20
    },
    dataTitle: {
        fontWeight: "bold",
        fontSize: 30
    }, 
    dataContainer: {

    },
    dataRating: {
        fontWeight: "bold"
    },
    dataComment: {
        
    },
})

export default styles;