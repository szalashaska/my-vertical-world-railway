import React, { useContext, useRef, useEffect, useState } from "react";
import MapContext from "../contexts/MapContext";
import Overlay from "ol/Overlay";
import {
  CrossIcon,
  PopupButton,
  PopupContainer,
  SinglePopupContent,
} from "./styled/LocationOverlay.styled";
import { useParams } from "react-router-dom";
import { ButtonStyled, LinkStyled } from "../constans/GlobalStyles";

const SingleLocationOverlay = () => {
  const { map } = useContext(MapContext);
  const [popupOverlay, setPopupOverlay] = useState(null);
  const [popupLinkTo, setPopupLinkTo] = useState("/");

  const { locationId } = useParams();

  const popupContainer = useRef();
  const popupCloseButton = useRef();
  const popupContent = useRef();
  const popupLink = useRef();

  const handleClosePopup = () => {
    if (!popupOverlay || !popupCloseButton.current) return;
    popupOverlay.setPosition(undefined);
    popupCloseButton.current.blur();
  };

  const handleClickOnFeature = (e, feature) => {
    popupOverlay.setPosition(e.coordinate);
    popupContent.current.innerHTML = feature.get("name");

    if (!locationId) {
      setPopupLinkTo(`/locations/${feature.get("id")}`);
      popupLink.current.innerHTML = "Go to location";
    }
  };

  const handleClickOnMap = (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);

    if (!feature) return;
    else handleClickOnFeature(e, feature);
  };

  useEffect(() => {
    const overlay = new Overlay({
      element: popupContainer.current,
      //   positioning: "bottom-center",
      autoPan: {
        animation: {
          duration: 300,
        },
      },
    });

    setPopupOverlay(overlay);
  }, []);

  useEffect(() => {
    if (!map || !popupOverlay) return;

    map.addOverlay(popupOverlay);
    map.addEventListener("click", handleClickOnMap);
    map.addEventListener("movestart", handleClosePopup);

    return () => {
      if (map) {
        handleClosePopup();
        map.removeOverlay(popupOverlay);
        map.removeEventListener("click", handleClickOnMap);
        map.removeEventListener("movestart", handleClosePopup);
      }
    };
  }, [map, popupOverlay]);

  return (
    <PopupContainer ref={popupContainer}>
      <PopupButton
        type="button"
        ref={popupCloseButton}
        onClick={handleClosePopup}
      >
        <CrossIcon />
      </PopupButton>
      <SinglePopupContent ref={popupContent} />
      {!locationId && (
        <ButtonStyled as={LinkStyled} to={popupLinkTo} ref={popupLink} />
      )}
    </PopupContainer>
  );
};

export default SingleLocationOverlay;
