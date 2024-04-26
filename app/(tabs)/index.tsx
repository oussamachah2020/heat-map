import { StyleSheet } from 'react-native';
import HeatMap from "../../components/heat_map";
import { Coords } from "@/constants/coords";

export default function TabOneScreen() {
  return <HeatMap coordinates={Coords} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
