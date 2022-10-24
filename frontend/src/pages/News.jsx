import React, { useEffect, useState, useCallback } from "react";
import RoutesContainer from "../components/RoutesContainer";
import { Container, H1Styled } from "../constans/GlobalStyles";
import { getPaginatedContent } from "../helpers/Utils.helpers";
import { NewsStyled } from "./Pages.styled";

const baseURL = "api/routes-news";
const News = () => {
  const [routesData, setRoutesData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetRoutes = useCallback(
    async (url) => {
      setLoading(true);

      const routes = await getPaginatedContent(url);
      if (routes) {
        // Adding to existing array:
        // const newRoutes = routesData.concat(routes.results);
        // setRoutesData(newRoutes);

        // Adding with spread operator
        setRoutesData([...routesData, ...routes.results]);
        setNextPage(routes.next);

        setLoading(false);
      }
    },
    [routesData]
  );

  useEffect(() => {
    handleGetRoutes(baseURL);
  }, []);

  if (routesData.length === 0) {
    return <div>Routes does not exist.</div>;
  }

  return (
    <NewsStyled>
      <Container>
        <H1Styled align="center">
          Let's see what our climbers were up to lately{" "}
        </H1Styled>
        <RoutesContainer
          routes={routesData}
          loading={loading}
          nextPage={nextPage}
          getData={handleGetRoutes}
        />
      </Container>
    </NewsStyled>
  );
};

export default News;