import React, { useEffect, useContext } from "react";
import { MapContext } from "../../contexts/MapProvider";
import API from "../../utils/API";
import { makeStyles, styled } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import "./Map.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justify: "center",
    "& > *": {
      margin: theme.spacing(2, "auto"),
      width: theme.spacing(145),
      height: theme.spacing(70, "auto"),
      overflow: "auto"
    },
  },
}));

// STYLING
const MyPaper = styled(Paper)({
  elevation: 3,
});

const MyBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

const MyFab = styled(Fab)({
  backgroundColor: "#FFC107",
});
// END OF STYLING

export default function Map() {
  const classes = useStyles();
  const { map, setMap } = useContext(MapContext);

  const saveTrip = () => {
    const address = map.directionsControl.directions.directionsRequest;
    if (address === undefined) {
      toast.error("You should enter at least two states with cities !");
    } else {
      const startStreet = address.locations[0].street;
      const startCity = address.locations[0].adminArea5;
      const startState = address.locations[0].adminArea3;
      const startPostalCode = address.locations[0].postalCode;
      const destinationStreet = address.locations[1].street;
      const destinationCity = address.locations[1].adminArea5;
      const destinationState = address.locations[1].adminArea3;
      const destinationPostalCode = address.locations[1].postalCode;

      const savedTrip = {
        startCity: startCity,
        destinationCity: destinationCity,
        destinationState: destinationState,
        startState: startState,
        startStreet: startStreet,
        destinationStreet: destinationStreet,
        startPostalCode: startPostalCode,
        destinationPostalCode: destinationPostalCode,
      };
      // if(startCity==undefined||startState==undefined||startStreet==undefined){
      //   toast.error ("You should enter at least two states with cities !");

      // }else{
      //   API.saveTrip(savedTrip)
      //   .then((res) => {
      //     console.log(res);
      //     toast.success("You trip is successfully saved !");
      //     setTimeout(() => window.location.replace('/PastTrips'), 2000);

      //   })
      //   .catch((err) => {
      //     console.log("this is error message  " + err);
      //     toast.error ("You should enter at least two states with cities !");

      //   });
      // }

      API.saveTrip(savedTrip)
        .then((res) => {
          toast.success("You trip is successfully saved !");
          setTimeout(() => window.location.replace("/PastTrips"), 2000);
        })
        .catch((err) => {
          console.log("this is error message  " + err);
          toast.error("You should enter at least two states with cities !");
        });
    }
  };

  useEffect(() => {
    const mapquest = window.L.mapquest;
    mapquest.key = "TzrDot8zE5IyvIXUg7RP0ZiSWDnzqxCZ";
    var baseLayer = window.L.mapquest.tileLayer("map");
    var map = window.L.mapquest.map("map", {
      center: [33.753746, -84.38633],
      layers: baseLayer,
      zoom: 12,
    });

    window.L.control
      .layers({
        Map: baseLayer,
        Hybrid: window.L.mapquest.tileLayer("hybrid"),
        Satellite: window.L.mapquest.tileLayer("satellite"),
        Light: window.L.mapquest.tileLayer("light"),
        Dark: window.L.mapquest.tileLayer("dark"),
      })
      .addTo(map);

    mapquest
      .directionsControl({
        routeSummary: {
          enabled: false,
        },
        narrativeControl: {
          enabled: true,
          compactResults: false,
        },
      })
      .addTo(map);

    mapquest.geocodingControl().addTo(map);

    map.addControl(mapquest.control());

    setMap(map);
  }, []);

  return (
    <div className={classes.root}>
      <MyPaper>
        <div id="map"></div>
      </MyPaper>
      <MyBox>
        <div>
          <MyFab
            variant="extended"
            size="medium"
            aria-label="add"
            className={classes.margin}
            onClick={(e) => saveTrip(e)}
          >
            <NavigationIcon />
            Save Search
          </MyFab>
          <ToastContainer />
        </div>
      </MyBox>
    </div>
  );
}
