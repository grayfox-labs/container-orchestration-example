#[macro_use] extern crate rocket;

use std::thread;
use rand::RngExt;
use rocket::serde::{Serialize, json::Json};
use rocket_cors::{AllowedOrigins, CorsOptions};

// Create a data structure to represent the submission result
// This uses Rust macros to enable turning this struct into JSON
#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
struct SubmissionResult {
  status: String,
  // Rust prefers snake_case for field names,
  // but we use serde to rename them for JSON
  #[serde(rename = "testsPassed")]
  tests_passed: u32,
  #[serde(rename = "testsFailed")]
  tests_failed: u32,
  #[serde(rename = "totalTests")]
  total_tests: u32,
}

// Declare our API route for submitting assignments
#[post("/submit/<id>")]
fn submit(id: &str) -> Json<SubmissionResult> {
  println!("Processing submission for ID: {}", id);

  // Normally you'd handle a submission's body here,
  // such as a file for processing

  // Perform some processing for the submission
  thread::sleep(std::time::Duration::from_secs(2));

  // Initialize the random number generator
  let mut rng: rand::rngs::SmallRng = rand::make_rng();
  // Generate a random number of passed tests
  let passed = rng.random_range(0..=15);

  // Respond with the submission result
  Json(SubmissionResult {
    status: "pass".to_string(),
    tests_passed: passed,
    tests_failed: 15 - passed,
    total_tests: 15
  })
}

#[launch]
fn rocket() -> _ {
  let cors = CorsOptions::default()
    // Allow all origins for CORS
    // Only for testing, never use this in production
    .allowed_origins(AllowedOrigins::all())
    .to_cors()
    .expect("CORS Configuration Failed!");

  rocket::build()
    .attach(cors)
    .mount("/", routes![submit])
}
