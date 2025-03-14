import React, { useEffect, useState, useContext } from "react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";
import "../css/experience.css";

const styles = {
  ulStyle: "list-disc pl-5",
  subtitleContainerStyle: "mt-2 mb-2",
  subtitleStyle: "inline-block font-semibold",
  inlineChild: "inline-block text-gray-500",
  itemStyle: "mb-4",
};

function Experience({ header }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences)
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="w-full flex justify-center px-4">
          <div className="max-w-4xl w-full">
            <Timeline lineColor={theme.timelineLineColor}>
              {data.map((item) => (
                <motion.div
                  key={item.title + item.dateText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TimelineItem
                    dateText={item.dateText}
                    dateInnerStyle={{ background: theme.accentColor }}
                    className={styles.itemStyle}
                    bodyContainerStyle={{ color: theme.color }}
                  >
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <div className={styles.subtitleContainerStyle}>
                      <h4 className={`${styles.subtitleStyle} text-${theme.accentColor}`}>{item.subtitle}</h4>
                      {item.workType && <h5 className={styles.inlineChild}>· {item.workType}</h5>}
                    </div>
                    <ul className={styles.ulStyle}>
                      {item.workDescription.map((point) => (
                        <li key={point} className="mb-2">
                          <ReactMarkdown
                            children={point}
                            components={{ p: "span" }}
                          />
                        </li>
                      ))}
                    </ul>
                  </TimelineItem>
                </motion.div>
              ))}
            </Timeline>
          </div>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
