import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "grommet";
import { useState } from "react";
import type { Assignment } from "../types/Assignment";
import type { SubmissionResult } from "../types/SubmissionResult";

const SUBMISSIONS_API_HOST = import.meta.env.VITE_SUBMISSIONS_API_HOST || 'localhost';

export default function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  const handleSubmit = async () => {
    setSubmitted(true);

    try {
      const response = await fetch(`http://${SUBMISSIONS_API_HOST}:8000/submit/${assignment.id}`, {
        method: "POST",
      });
      const result: SubmissionResult = await response.json();
      setSubmissionResult(result);
    } catch (error) {
      console.error("Error submitting assignment:", error);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <Card>
      <CardHeader
        direction="column"
        background="background-contrast"
        justify="center"
        gap="none"
      >
        <Heading
          level={2}
          margin={{ vertical: "none" }}
        >
          {assignment.title}
        </Heading>
        <Text>{new Date(assignment.dueDate).toLocaleDateString()}</Text>
      </CardHeader>

      <CardBody>
        <Text>{assignment.description}</Text>
      </CardBody>

      <CardFooter background="background-contrast" justify="end">
        {submissionResult && (
          <Text>
            <Text color="status-ok">{submissionResult.testsPassed}</Text>
            /
            <Text color="status-critical">{submissionResult.testsFailed}</Text>
            /
            <Text color="text">{submissionResult.totalTests}</Text>
          </Text>
        )}
        <Button
          primary
          label="Submit"
          success={submissionResult !== null}
          busy={submitted}
          onClick={handleSubmit}
        />
      </CardFooter>
    </Card>
  );
}
