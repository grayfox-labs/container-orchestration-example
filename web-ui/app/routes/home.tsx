import { Box, Header, Heading, Page, PageContent } from "grommet";
import { useState, useEffect } from "react";
import AssignmentCard from "../components/AssignmentCard";
import type { Route } from "./+types/home";
import type { Assignment } from "../types/Assignment";

const ASSIGNMENTS_API_HOST = import.meta.env.VITE_ASSIGNMENTS_API_HOST || 'localhost';

// Sets the page title in the Browser, or set other page metadata
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Assignments" },
  ];
}

export default function Home() {
  // Holds the Assignments we get from the API
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  // Called once when the page first loads
  useEffect(() => {
    // Fetch assignments from the API
    fetch(`http://${ASSIGNMENTS_API_HOST}:3000/assignments`)
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
          {/* Loop through our list of Assignments and render each */}
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </Box>
      </PageContent>
    </Page>
  );
}
