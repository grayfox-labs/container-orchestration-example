import { Box, Header, Heading, Page, PageContent } from "grommet";
import { useState, useEffect } from "react";
import AssignmentCard from "../components/AssignmentCard";
import type { Route } from "./+types/home";
import type { Assignment } from "../types/Assignment";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Assignments" },
  ];
}

export default function Home() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    // Fetch assignments from an API or other source
    fetch("http://localhost:3000/assignments")
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);
  return (
    <Page kind="narrow">
      <Header background="brand" justify="center">
        <Heading level={1} fill>Assignments</Heading>
      </Header>

      <PageContent>
        <Box pad="medium" direction="column" gap="medium">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </Box>
      </PageContent>
    </Page>
  );
}
