#[macro_use] extern crate rocket;

use std::thread;
use rocket::serde::{Serialize, json::Json};

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
struct SubmissionResult {
  status: String,
  testsPassed: u32,
  testsFailed: u32,
  totalTests: u32,
}

#[post("/submit/<id>")]
fn submit(id: &str) -> Json<SubmissionResult> {
  // Perform some processing for the submission
  thread::sleep(std::time::Duration::from_secs(2));

  // Respond with the submission result
  Json(SubmissionResult {
    status: "pass".to_string(),
    testsPassed: 15,
    testsFailed: 0,
    totalTests: 15
  })
}

#[launch]
fn rocket() -> _ {
  rocket::build().mount("/", routes![submit])
}
