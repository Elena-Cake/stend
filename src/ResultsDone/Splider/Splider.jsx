import React from "react";
import Charts from "./Charts/Charts";
import ChartsBar from "./ChartsBar/ChartsBar";
import './Splider.css';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Splider = ({ }) => {

    const thumbnails = {
        rewind: true,
        fixedWidth: 104,
        fixedHeight: 58,
        isNavigation: true,
        gap: 10,
        focus: 'center',
        pagination: false,
        cover: true,
        dragMinThreshold: {
            mouse: 4,
            touch: 10,
        },
        breakpoints: {
            640: {
                fixedWidth: 66,
                fixedHeight: 38,
            },
        },
    }

    return (
        <div className="charts">
            <select className="charts__select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            <Splide hasTrack={false} aria-label="..." >
                <div className="custom-wrapper">
                    <SplideTrack>
                        <SplideSlide>
                            <ChartsBar />
                        </SplideSlide>
                        <SplideSlide>
                            <Charts text={2} />
                        </SplideSlide>
                        <SplideSlide>
                            <Charts text={3} />
                        </SplideSlide>
                    </SplideTrack>

                    <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev">Prev</button>
                        <button className="splide__arrow splide__arrow--next">Next</button>
                    </div>
                </div>
            </Splide>
        </div>
    )
}

export default Splider;
