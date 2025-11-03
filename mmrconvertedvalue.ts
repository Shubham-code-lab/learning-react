{
    "asset_uri": "https://compass.amagi.tv/gms/entity/A93B5v6bUo6u8ioPzcrjvFz",
    "publisher_asset_id": "HF_A01043157_1",
    "qc_report": [
        {
          asset_status: {
            ingest_status_details: {
              jobs_status_details: [
                {
                  aa_result_description: "original/image",
                  job_status: "Failed",
                  job_type: "fetch_small_media",
                  job_url: "/jobs/5404e228aaca05d4",
                  source_url:
                    "https://truffle-assets.tastemadecontent.net/dfcb0aa8-dih-109-littleextrahealth-thumbnail.jpg",
                },
                {
                  aa_result_description: "original/media",
                  job_status: "Succeeded",
                  job_type: "fetch_media",
                  job_url: "/jobs/cae939268cf3439f",
                  source_url:
                    "https://amaginow-qa.s3.us-east-2.amazonaws.com/jammer/asset/HF_A01043157_Y.mp4",
                },
              ],
            },
            ingest_status_updated_at: "2024-05-17T06:25:55.607913Z",
            ingest_wf_status: "completed_with_minor_issues",
            linear_metadata_status: true,
            linear_metadata_status_updated_at: "2024-05-17T06:23:30.235117Z",
            metadata_status: "created",
            metadata_status_updated_at: "2024-05-17T06:22:59.722047Z",
            missing_linear_resource: true,
            missing_resource_details: {
              missing_image: false,
              missing_media: false,
              missing_subtitle: true,
            },
            missing_vod_resource: true,
            mm_asset_status: "validation_failed",
            playout_transcoding_status: "pending",
            playout_transcoding_status_details: [
              {
                channel_code: "amg14062c104",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c108",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c106",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c105",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c107",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c109",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c114",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c115",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c116",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c110",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c112",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c111",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c113",
                transcoding_status: "pending",
              },
              {
                channel_code: "amg14062c118",
                transcoding_status: "skipped",
              },
            ],
            playout_transcoding_status_updated_at: "2024-05-17T06:22:59.722047Z",
            processing_status_details: {
              jobs_status_details: [
                {
                  aa_result_description: "derived/preview",
                  job_status: "Failed",
                  job_type: "generate_preview",
                  job_url: "/jobs/5674d06bce7cc280",
                  source_url:
                    "s3://jammer-development-new/amg14062/asset_artifacts/video/fetch_media/cae939268cf3439f/HF_A01043157_Y.mp4",
                },
                {
                  aa_result_description: "derived/metadata",
                  job_status: "Succeeded",
                  job_type: "qc",
                  job_url: "/jobs/304809ac32256cce",
                  source_url:
                    "s3://jammer-development-new/amg14062/asset_artifacts/video/fetch_media/cae939268cf3439f/HF_A01043157_Y.mp4",
                },
                {
                  aa_result_description: "derived/metadata",
                  job_status: "Succeeded",
                  job_type: "validate_qc",
                  job_url: "/jobs/97f32c7cd1a162cf",
                },
              ],
            },
            processing_status_updated_at: "2024-05-17T10:51:48.740944Z",
            processing_wf_status: "completed_with_minor_issues",
            vod_metadata_status: true,
            vod_metadata_status_updated_at: "2024-05-17T06:22:59.722047Z",
          },
          asset_title: "American Delites",
          asset_type: "episode",
          asset_uri: "https://compass.amagi.tv/gms/entity/A93B5v6bUo6u8ioPzcrjvFz",
          image_resource_urls: [
            {
              kind: "original/image",
              url: "https://truffle-assets.tastemadecontent.net/dfcb0aa8-dih-109-littleextrahealth-thumbnail.jpg",
            },
          ],
          ingest_id: "t3j497nv1s1f1r5yy",
          ingest_name: "First",
          ingest_type: "mrss",
          media_resource_urls: [
            {
              content_type: "video/mp4",
              framerate: "25.000",
              kind: "original/media",
              url: "https://amaginow-qa.s3.us-east-2.amazonaws.com/jammer/asset/HF_A01043157_Y.mp4",
            },
          ],
          meta: {
            account_id: "amg14062",
            created_at: "2024-05-17T06:22:52.655836996Z",
            modified_at: "2024-05-17T06:22:52.655836996Z",
            resource_id: "A93B5v6bUo6u8ioPzcrjvFz",
            resource_name: "assets",
            status: "CREATED",
          },
          parent_ingest_url:
            "http://stv-transformer-svc.amaginow-dev.svc.cluster.local:8000/api/v1/ingests/amgrss/6646f7187532070d2288548e",
          publisher_asset_id: "HF_A01043157_1",
          qc_report: [
            {
              qc_target: "Original_File",
              report: {
                black_frames: {
                  disabled: false,
                  status: "fail",
                  sections: [
                    {
                      id: 1,
                      start_ms: "10000",
                      end_ms: "12345",
                      duration: "2345",
                      segment_id: "1",
                      disabled: false,
                      status: "fail",
                    },
                    {
                      id: 1,
                      start_ms: "10000",
                      end_ms: "12345",
                      duration: "2345",
                      segment_id: "1",
                      disabled: false,
                      status: "fail",
                    },
                  ],
                  threshold: 8000,
                },
                freeze: {
                  disabled: false,
                  status: "fail",
                  sections: [
                    {
                      id: 1,
                      start_ms: "10000",
                      end_ms: "12345",
                      duration: "2345",
                      segment_id: "1",
                      disabled: false,
                      status: "ignored",
                    },
                    {
                      id: 2,
                      start_ms: "10000",
                      end_ms: "12345",
                      duration: "2345",
                      segment_id: "2",
                      disabled: false,
                      status: "fail",
                    },
                  ],
                  threshold: 8000,
                },
      
                video_resolution_check: {
                  disabled: false,
                  resolution: [
                    {
                      height: 1080,
                      width: 1920,
                    },
                    {
                      height: 480,
                      width: 720,
                    },
                    {
                      height: 720,
                      width: 1280,
                    },
                    {
                      height: 220,
                      width: 320,
                    },
                  ],
                  status: "fail",
                },
      
                min_video_duration_check: {
                  disabled: false,
                  status: "fail",
                  threshold: 6,
                },
      
                //check newly added
                av_pts_difference_check: {
                  //name changed //find
                  threshold: 1000,
                  sections: {
                    difference_observed: 5000,
                    threshold: 3500,
                  },
                  disabled: false,
                  status: "fail",
                },
      
                acceptable_container_type_check: {
                  container_types: ["hls", "mov", "mkv", "mp4", "mxf", "ts"],
                  disabled: false,
                  status: "fail",
                },
      
                loudness: {
                  disabled: false,
                  sections: [
                    {
                      id: 1, //new value
                      audio_track_id: 1,
                      disabled: false,
                      observed_loudness: -25.9,
                      status: "fail", //what to do ?
                    },
                  ],
                  status: "fail",
                  threshold: -28,
                },
      
                silence: {
                  disabled: false,
                  sections: [
                    {
                      audio_track_id: 1,
                      disabled: false,
                      duration: 1200,
                      end_ms: 2765000,
                      id: 1,
                      segment_id: 5,
                      start_ms: 2763800,
                      status: "fail",
                    },
                  ],
                  status: "fail",
                  threshold: 1000,
                },
      
                reason:
                  "loudness check failed, silence check failed, minimum video duration check failed, video resolution check failed, acceptable container type check failed, video encoding check failed",
      
                subtitle_validations: [
                  {
                    duration_check: {
                      disabled: false,
                      threshold: 5000,
                      status: "fail",
                    },
                    duration_exceeds_video_duration_check: {
                      disabled: false,
                      status: "fail",
                    },
                    //removed :-
                    //   time_code_sync_with_video: {
                    //     disabled: false,
                    //     status: "pass",
                    //   },
                    acceptable_container_type_check: {
                      container_types: ["vtt"],
                      status: "fail",
                      disabled: false,
                    },
                    language_code: "en",
                    line_length_check: {
                      disabled: false,
                      threshold: 30,
                      lines: [
                        {
                          event_number: 7,
                          line_number: 11,
                          line_text: "When it comes to home products,",
                        },
                        {
                          event_number: 18,
                          line_number: 32,
                          line_text: "actually started as a challenge",
                        },
                        {
                          event_number: 22,
                          line_number: 38,
                          line_text: "So upon graduating from school,",
                        },
                        {
                          event_number: 23,
                          line_number: 39,
                          line_text: "I already hit the ground running",
                        },
                        {
                          event_number: 27,
                          line_number: 45,
                          line_text: "we use a solid 5/8 hex rod steel",
                        },
                        {
                          event_number: 52,
                          line_number: 89,
                          line_text: "and they’re all welded together",
                        },
                        {
                          event_number: 67,
                          line_number: 117,
                          line_text: " final assembly onto the chair.",
                        },
                        {
                          event_number: 74,
                          line_number: 131,
                          line_text: "straps that you can do yourself.",
                        },
                        {
                          event_number: 97,
                          line_number: 169,
                          line_text: "but that you can just be part of",
                        },
                        {
                          event_number: 102,
                          line_number: 177,
                          line_text: "Not laugh at it. Laugh with it.",
                        },
                        {
                          event_number: 108,
                          line_number: 188,
                          line_text: "I started blowing glass in 2000.",
                        },
                        {
                          event_number: 109,
                          line_number: 189,
                          line_text: "I had a friend of mine on a whim",
                        },
                        {
                          event_number: 120,
                          line_number: 208,
                          line_text: " that moment in time and space.",
                        },
                        {
                          event_number: 125,
                          line_number: 217,
                          line_text: "and we manipulate it from there.",
                        },
                        {
                          event_number: 130,
                          line_number: 226,
                          line_text: "And that becomes the mouthpiece",
                        },
                        {
                          event_number: 140,
                          line_number: 244,
                          line_text: "I drop the bubble into the mold.",
                        },
                        {
                          event_number: 161,
                          line_number: 281,
                          line_text: " pressing a mold into the form.",
                        },
                        {
                          event_number: 162,
                          line_number: 282,
                          line_text: "Now we grab the fully formed cup",
                        },
                        {
                          event_number: 164,
                          line_number: 285,
                          line_text: "We heat up the point of contact",
                        },
                        {
                          event_number: 184,
                          line_number: 317,
                          line_text: "I was prepared for the failure.",
                        },
                        {
                          event_number: 188,
                          line_number: 323,
                          line_text: "Wake up, do it, go home, repeat.",
                        },
                        {
                          event_number: 191,
                          line_number: 328,
                          line_text: "I was going to figure this out.",
                        },
                        {
                          event_number: 195,
                          line_number: 335,
                          line_text: "that it’s not five giant steps.",
                        },
                        {
                          event_number: 227,
                          line_number: 387,
                          line_text: " - [Matt] Are we ready to rock?",
                        },
                        {
                          event_number: 244,
                          line_number: 417,
                          line_text: "and a guy will come to the shop",
                        },
                        {
                          event_number: 265,
                          line_number: 453,
                          line_text: " able to do for a bigger brand.",
                        },
                        {
                          event_number: 276,
                          line_number: 473,
                          line_text: " important part of our process.",
                        },
                        {
                          event_number: 284,
                          line_number: 484,
                          line_text: "And then we can begin marbling.",
                        },
                        {
                          event_number: 287,
                          line_number: 489,
                          line_text: "and a really beautiful leather.",
                        },
                        {
                          event_number: 298,
                          line_number: 510,
                          line_text: "tank with one rake horizontally",
                        },
                        {
                          event_number: 302,
                          line_number: 517,
                          line_text: "It’s crucial to be very precise.",
                        },
                        {
                          event_number: 306,
                          line_number: 524,
                          line_text: "that has remained on the fabric.",
                        },
                        {
                          event_number: 312,
                          line_number: 533,
                          line_text: "or it will go out for an order.",
                        },
                        {
                          event_number: 327,
                          line_number: 560,
                          line_text: " ability to seamlessly interact",
                        },
                        {
                          event_number: 338,
                          line_number: 580,
                          line_text: "you throw a bunch of hard things",
                        },
                        {
                          event_number: 345,
                          line_number: 590,
                          line_text: "lay that paper pattern onto the",
                        },
                        {
                          event_number: 355,
                          line_number: 608,
                          line_text: " exterior parts of the leather,",
                        },
                        {
                          event_number: 374,
                          line_number: 642,
                          line_text: "producing little leather goods.",
                        },
                        {
                          event_number: 397,
                          line_number: 684,
                          line_text: "I had a palette in mind already,",
                        },
                        {
                          event_number: 413,
                          line_number: 712,
                          line_text: "into the same size parallelogram",
                        },
                        {
                          event_number: 417,
                          line_number: 720,
                          line_text: "Once I have all the pieces cut,",
                        },
                        {
                          event_number: 426,
                          line_number: 737,
                          line_text: "tape so it sticks on the glass.",
                        },
                        {
                          event_number: 453,
                          line_number: 784,
                          line_text: " patina is ready to be applied.",
                        },
                        {
                          event_number: 460,
                          line_number: 794,
                          line_text: "and you can pop in an air plant.",
                        },
                        {
                          event_number: 462,
                          line_number: 797,
                          line_text: "So I was really, really excited",
                        },
                        {
                          event_number: 466,
                          line_number: 805,
                          line_text: "I hope that people love my work",
                        },
                        {
                          event_number: 469,
                          line_number: 811,
                          line_text: "telling me how much they love it",
                        },
                        {
                          event_number: 472,
                          line_number: 814,
                          line_text: "that make all the work worth it.",
                        },
                      ],
                      status: "pass",
                    },
                  },
                  {
                    duration_check: {
                      disabled: false,
                      threshold: 5000,
                      status: "fail",
                    },
                    duration_exceeds_video_duration_check: {
                      disabled: false,
                      status: "fail",
                    },
                    //removed :-
                    //   time_code_sync_with_video: {
                    //     disabled: false,
                    //     status: "pass",
                    //   },
                    acceptable_container_type_check: {
                      container_types: ["vtt"],
                      status: "fail",
                      disabled: false,
                    },
                    language_code: "eu",
                    line_length_check: {
                      disabled: false,
                      threshold: 30,
                      lines: [
                        {
                          event_number: 7,
                          line_number: 11,
                          line_text: "When it comes to home products,",
                        },
                        {
                          event_number: 18,
                          line_number: 32,
                          line_text: "actually started as a challenge",
                        },
                        {
                          event_number: 22,
                          line_number: 38,
                          line_text: "So upon graduating from school,",
                        },
                        {
                          event_number: 23,
                          line_number: 39,
                          line_text: "I already hit the ground running",
                        },
                        {
                          event_number: 27,
                          line_number: 45,
                          line_text: "we use a solid 5/8 hex rod steel",
                        },
                        {
                          event_number: 52,
                          line_number: 89,
                          line_text: "and they’re all welded together",
                        },
                        {
                          event_number: 67,
                          line_number: 117,
                          line_text: " final assembly onto the chair.",
                        },
                        {
                          event_number: 74,
                          line_number: 131,
                          line_text: "straps that you can do yourself.",
                        },
                        {
                          event_number: 97,
                          line_number: 169,
                          line_text: "but that you can just be part of",
                        },
                        {
                          event_number: 102,
                          line_number: 177,
                          line_text: "Not laugh at it. Laugh with it.",
                        },
                        {
                          event_number: 108,
                          line_number: 188,
                          line_text: "I started blowing glass in 2000.",
                        },
                        {
                          event_number: 109,
                          line_number: 189,
                          line_text: "I had a friend of mine on a whim",
                        },
                        {
                          event_number: 120,
                          line_number: 208,
                          line_text: " that moment in time and space.",
                        },
                        {
                          event_number: 125,
                          line_number: 217,
                          line_text: "and we manipulate it from there.",
                        },
                        {
                          event_number: 130,
                          line_number: 226,
                          line_text: "And that becomes the mouthpiece",
                        },
                        {
                          event_number: 140,
                          line_number: 244,
                          line_text: "I drop the bubble into the mold.",
                        },
                        {
                          event_number: 161,
                          line_number: 281,
                          line_text: " pressing a mold into the form.",
                        },
                        {
                          event_number: 162,
                          line_number: 282,
                          line_text: "Now we grab the fully formed cup",
                        },
                        {
                          event_number: 164,
                          line_number: 285,
                          line_text: "We heat up the point of contact",
                        },
                        {
                          event_number: 184,
                          line_number: 317,
                          line_text: "I was prepared for the failure.",
                        },
                        {
                          event_number: 188,
                          line_number: 323,
                          line_text: "Wake up, do it, go home, repeat.",
                        },
                        {
                          event_number: 191,
                          line_number: 328,
                          line_text: "I was going to figure this out.",
                        },
                        {
                          event_number: 195,
                          line_number: 335,
                          line_text: "that it’s not five giant steps.",
                        },
                        {
                          event_number: 227,
                          line_number: 387,
                          line_text: " - [Matt] Are we ready to rock?",
                        },
                        {
                          event_number: 244,
                          line_number: 417,
                          line_text: "and a guy will come to the shop",
                        },
                        {
                          event_number: 265,
                          line_number: 453,
                          line_text: " able to do for a bigger brand.",
                        },
                        {
                          event_number: 276,
                          line_number: 473,
                          line_text: " important part of our process.",
                        },
                        {
                          event_number: 284,
                          line_number: 484,
                          line_text: "And then we can begin marbling.",
                        },
                        {
                          event_number: 287,
                          line_number: 489,
                          line_text: "and a really beautiful leather.",
                        },
                        {
                          event_number: 298,
                          line_number: 510,
                          line_text: "tank with one rake horizontally",
                        },
                        {
                          event_number: 302,
                          line_number: 517,
                          line_text: "It’s crucial to be very precise.",
                        },
                        {
                          event_number: 306,
                          line_number: 524,
                          line_text: "that has remained on the fabric.",
                        },
                        {
                          event_number: 312,
                          line_number: 533,
                          line_text: "or it will go out for an order.",
                        },
                        {
                          event_number: 327,
                          line_number: 560,
                          line_text: " ability to seamlessly interact",
                        },
                        {
                          event_number: 338,
                          line_number: 580,
                          line_text: "you throw a bunch of hard things",
                        },
                        {
                          event_number: 345,
                          line_number: 590,
                          line_text: "lay that paper pattern onto the",
                        },
                        {
                          event_number: 355,
                          line_number: 608,
                          line_text: " exterior parts of the leather,",
                        },
                        {
                          event_number: 374,
                          line_number: 642,
                          line_text: "producing little leather goods.",
                        },
                        {
                          event_number: 397,
                          line_number: 684,
                          line_text: "I had a palette in mind already,",
                        },
                        {
                          event_number: 413,
                          line_number: 712,
                          line_text: "into the same size parallelogram",
                        },
                        {
                          event_number: 417,
                          line_number: 720,
                          line_text: "Once I have all the pieces cut,",
                        },
                        {
                          event_number: 426,
                          line_number: 737,
                          line_text: "tape so it sticks on the glass.",
                        },
                        {
                          event_number: 453,
                          line_number: 784,
                          line_text: " patina is ready to be applied.",
                        },
                        {
                          event_number: 460,
                          line_number: 794,
                          line_text: "and you can pop in an air plant.",
                        },
                        {
                          event_number: 462,
                          line_number: 797,
                          line_text: "So I was really, really excited",
                        },
                        {
                          event_number: 466,
                          line_number: 805,
                          line_text: "I hope that people love my work",
                        },
                        {
                          event_number: 469,
                          line_number: 811,
                          line_text: "telling me how much they love it",
                        },
                        {
                          event_number: 472,
                          line_number: 814,
                          line_text: "that make all the work worth it.",
                        },
                      ],
                      status: "fail",
                    },
                  },
                ],
      
                leading_black_silence_check: {
                  disabled: false,
                  status: "fail",
                  threshold: 8000,
                },
      
                trailing_black_silence_check: {
                  disabled: false,
                  status: "fail",
                  threshold: 8000,
                },
                video_encoding_check: {
                  disabled: false,
                  encoding_formats: ["avc", "mpeg2", "h264"],
                  status: "fail",
                },
              },
              status: "FAILED",
            },
          ],
        },
      ]
}