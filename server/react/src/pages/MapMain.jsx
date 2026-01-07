import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import axios from "axios";
import MapLine from "../components/MapLine";
import UtilityBanner from "../components/UtilityBanner";
import dayjs from "dayjs";
import CalcDist from "../components/CalcDist";

const libraries = ["geometry"];
const key = import.meta.env.VITE_GCP_APIKEY;

// TODO: 次APIのクエリどうにかしといて
function MapMain() {
    const [start, setStart] = useState(dayjs().startOf("day"));
    const [end, setEnd] = useState(dayjs().endOf("day"));
    const [items, setItems] = useState([]);
    const [dist, setDist] = useState(0);

    useEffect(() => {
        console.log(items);
    }, [items]);

    useEffect(() => {
        const fetchItems = async () => {
            axios.get("http://localhost:8080/map", {
                params: {
                    start: start.format("YYYY-MM-DDTHH:mm:ss"),
                    end: end.format("YYYY-MM-DDTHH:mm:ss")
                }
            })
                .then(res => {
                    console.log(res);
                    const newItems = (res.data && Array.isArray(res.data))
                        ? res.data.map(item => ({
                            lat: item.latitude,
                            lng: item.longitude
                        }))
                        : [];
                    setItems(newItems);
                })
                .catch(err => {
                    console.error(err);
                });
        };

        fetchItems();
    }, [start, end]);

    return (
        <LoadScript googleMapsApiKey={key} libraries={libraries}>
            <div style={{
                display: "flex",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1000,
                overflow: "hidden",
                backgroundColor: "#242424" // Match bg
            }}>
                <div style={{ width: "25%", flexShrink: 0, height: "100%", overflowY: "auto", overflowX: "hidden" }}>
                    <UtilityBanner
                        start={start}
                        end={end}
                        dist={dist}
                        setStart={setStart}
                        setEnd={setEnd}
                    />
                </div>
                <div style={{ flexGrow: 1, height: "100%", position: "relative" }}>
                    <MapLine items={items} />
                    <CalcDist items={items} setDist={setDist} />
                </div>
            </div>
        </LoadScript>
    );
}

export default MapMain;
