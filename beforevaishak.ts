// AssetsQuery.tsx

Hi vishask,
can you please provide the assets in media manger for which all qc are failed having video and mutiple audio of .m3u8 format?
I have found some of the few inconsitaince in the API.
1] subtitles format, file size, and duration is still not present.
2] we only discussed about removing status property but disabled is also being removed how can we disabled the perticular section when user igores them.

Global setting :-
1] https://amagiengg.atlassian.net/browse/AN30-11857?linkSource=email, this is still pending.
for which the format should be as follow.
"duration_exceedes_video_duration": {
   "enabled": true,
   "set_as": "error"
},


Hi Vishask,
Could you please provide the asset in the Media Manager where all QCs have failed, specifically those with video and multiple audio tracks in .m3u8 format?

I have found a few inconsistencies in the API:
1] Subtitle format, file size, and duration are still not included.
2] We had only discussed removing the status property, but the disabled property is also being removed. How are we supposed to disable a particular section when a user ignores it?
3] due to lack of qc error wasn't able to test other qc errors.

Global Settings:
1] The following ticket is still pending: AN30-11857
The expected format should be:
"duration_exceeds_video_duration": {
  "enabled": true,
  "set_as": "error"
}


import { useCustomSnackbar } from '@amagimedia/amagi-design-system';
import { AxiosError, AxiosResponse } from '@amagimedia/api-client';
import { MM_ASSET_POLLING_INTERVAL } from '@amagimedia/commons';
import { GMS_QUERY_API_MAX_LIMIT } from '@amagimedia/commons/src/constants/contentManager';
import { IErrorResponse } from '@amagimedia/commons/src/utils';
import { UseQueryResult, useQueries, useQuery } from 'react-query';
import { getAssetStats, getAssetsData } from '../apis/ContentDetails';
import { assetStatsResponse, qcResponse } from '../types/mmQcInterface';
import { shouldPollAssets } from '../utils/Utils';

const qc_report = [
  {
    qc_target: 'Original_File',
    report: {
      black_frames: {
        disabled: false,
        status: 'fail',
        sections: [
          {
            id: 1,
            start_ms: 10000,
            end_ms: 12345,
            duration: 2345,
            segment_id: 1,
            disabled: false,
          },
          {
            id: 2,
            start_ms: 10000,
            end_ms: 12345,
            duration: 2345,
            segment_id: 4,
            disabled: true,
          },
        ],
        threshold: 8000,
      },
      freeze: {
        disabled: false,
        status: 'fail',
        sections: [
          {
            id: 1,
            start_ms: 10000,
            end_ms: 12345,
            duration: 2345,
            segment_id: 1,
            disabled: false,
          },
          {
            id: 2,
            start_ms: 10000,
            end_ms: 12345,
            duration: 2345,
            segment_id: 2,
            disabled: false,
          },
        ],
        threshold: 8000,
      },

      video_resolution_check: {
        // disabled: false,  //removed
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
        status: 'fail',
      },

      min_video_duration_check: {
        disabled: false,
        status: 'fail',
        threshold: 5000,
      },

      //check newly added
      av_pts_difference_check: {   //dev api done
        //name changed //find
        sections: [
          {
            id: 2,
            audio_track_id: 1,
            difference_observed: 5000,
            // threshold: 3500,//removed
            video_start_timestamp: 65000,
            audio_start_timestamp: 120000,
            // disabled: false,  //removed
          },
          {
            id: 1,
            audio_track_id: 2,
            difference_observed: 5000,
            // threshold: 3500,//removed
            video_start_timestamp: 65000,
            audio_start_timestamp: 120000,
            // disabled: false,  //removed
          },
        ],
        threshold: 3500,
        // disabled: false,
        status: 'fail',
      },
      loudness: {  //dev api done
        // disabled: false, //removed
        sections: [
          {
            id: 1, //removed
            observed_loudness: -25.9,
            audio_track_id: 1,
            // disabled: false, //removed
          },
          {
            id: 2, //removed
            observed_loudness: -29.9,
            audio_track_id: 0,
            // disabled: false, //removed
          },
        ],
        status: 'fail',
        threshold: -22,
      },
      silence: {
        disabled: false,
        sections: [
          {
            id: 1,
            start_ms: 112000,
            end_ms: 2765000,
            duration: 1200,
            segment_id: 5,
            // disabled: false, //removed
            audio_track_id: 0,
          },
          {
            id: 2,
            start_ms: 138000,
            end_ms: 2765000,
            duration: 1200,
            segment_id: 2,
            // disabled: false, //removed
            audio_track_id: 1,
          },
        ],
        status: 'fail',
        threshold: 1000,
      },

      reason:
        'loudness check failed, silence check failed, minimum video duration check failed, video resolution check failed, acceptable container type check failed, video encoding check failed',

      subtitle_validations: [
        {
          language_code: 'en',
          file_name: 'subtitles_en.vtt',
          duration_check: {
            disabled: false,
            threshold: 5000,
            status: 'fail',
          },
          duration_exceeds_video_duration_check: {
            disabled: false,
            status: 'fail',
            subtitle_duration: '01:30:00', // Added missing field
            video_duration: '01:25:00',
          },
          //removed :-
          //   time_code_sync_with_video: {
          //     disabled: false,
          //     status: "pass",
          //   },

          line_length_check: {
            disabled: false,
            threshold: 30,
            lines: [
              {
                start_timestamp: 7000,
                event_number: 1, //added
                line_number: 1, //added
                end_timestamp: 9000,  
                line_text: 'When it comes to home products,',
                character_length: 30,
              },
              {
                start_timestamp: 18000,
                end_timestamp: 20000,
                line_text: 'actually started as a challenge',
                character_length: 28,
              },
              {
                start_timestamp: 22000,
                end_timestamp: 24000,
                line_text: 'So upon graduating from school,',
                character_length: 31,
              },
              {
                start_timestamp: 23000,
                end_timestamp: 25000,
                line_text: 'I already hit the ground running',
                character_length: 31,
              },
              {
                start_timestamp: 27000,
                end_timestamp: 29000,
                line_text: 'we use a solid 5/8 hex rod steel',
                character_length: 32,
              },
              {
                start_timestamp: 52000,
                end_timestamp: 54000,
                line_text: "and they're all welded together",
                character_length: 29,
              },
              {
                start_timestamp: 67000,
                end_timestamp: 69000,
                line_text: 'final assembly onto the chair.',
                character_length: 28,
              },
              {
                start_timestamp: 74000,
                end_timestamp: 76000,
                line_text: 'straps that you can do yourself.',
                character_length: 30,
              },
              {
                start_timestamp: 97000,
                end_timestamp: 99000,
                line_text: 'but that you can just be part of',
                character_length: 30,
              },
              {
                start_timestamp: 102000,
                end_timestamp: 104000,
                line_text: 'Not laugh at it. Laugh with it.',
                character_length: 30,
              },
              {
                start_timestamp: 108000,
                end_timestamp: 110000,
                line_text: 'I started blowing glass in 2000.',
                character_length: 30,
              },
              {
                start_timestamp: 109000,
                end_timestamp: 111000,
                line_text: 'I had a friend of mine on a whim',
                character_length: 32,
              },
              {
                start_timestamp: 120000,
                end_timestamp: 122000,
                line_text: 'that moment in time and space.',
                character_length: 29,
              },
              {
                start_timestamp: 125000,
                end_timestamp: 127000,
                line_text: 'and we manipulate it from there.',
                character_length: 30,
              },
              {
                start_timestamp: 130000,
                end_timestamp: 132000,
                line_text: 'And that becomes the mouthpiece',
                character_length: 30,
              },
              {
                start_timestamp: 140000,
                end_timestamp: 142000,
                line_text: 'I drop the bubble into the mold.',
                character_length: 30,
              },
              {
                start_timestamp: 161000,
                end_timestamp: 163000,
                line_text: 'pressing a mold into the form.',
                character_length: 28,
              },
              {
                start_timestamp: 162000,
                end_timestamp: 164000,
                line_text: 'Now we grab the fully formed cup',
                character_length: 31,
              },
              {
                start_timestamp: 164000,
                end_timestamp: 166000,
                line_text: 'We heat up the point of contact',
                character_length: 30,
              },
              {
                start_timestamp: 184000,
                end_timestamp: 186000,
                line_text: 'I was prepared for the failure.',
                character_length: 29,
              },
              {
                start_timestamp: 188000,
                end_timestamp: 190000,
                line_text: 'Wake up, do it, go home, repeat.',
                character_length: 30,
              },
              {
                start_timestamp: 191000,
                end_timestamp: 193000,
                line_text: 'I was going to figure this out.',
                character_length: 29,
              },
              {
                start_timestamp: 195000,
                end_timestamp: 197000,
                line_text: "that it's not five giant steps.",
                character_length: 29,
              },
              {
                start_timestamp: 227000,
                end_timestamp: 229000,
                line_text: '- [Matt] Are we ready to rock?',
                character_length: 28,
              },
              {
                start_timestamp: 244000,
                end_timestamp: 246000,
                line_text: 'and a guy will come to the shop',
                character_length: 31,
              },
              {
                start_timestamp: 265000,
                end_timestamp: 267000,
                line_text: 'able to do for a bigger brand.',
                character_length: 28,
              },
              {
                start_timestamp: 276000,
                end_timestamp: 278000,
                line_text: 'important part of our process.',
                character_length: 29,
              },
              {
                start_timestamp: 284000,
                end_timestamp: 286000,
                line_text: 'And then we can begin marbling.',
                character_length: 29,
              },
              {
                start_timestamp: 287000,
                end_timestamp: 289000,
                line_text: 'and a really beautiful leather.',
                character_length: 30,
              },
              {
                start_timestamp: 298000,
                end_timestamp: 300000,
                line_text: 'tank with one rake horizontally',
                character_length: 31,
              },
              {
                start_timestamp: 302000,
                end_timestamp: 304000,
                line_text: "It's crucial to be very precise.",
                character_length: 30,
              },
              {
                start_timestamp: 306000,
                end_timestamp: 308000,
                line_text: 'that has remained on the fabric.',
                character_length: 29,
              },
              {
                start_timestamp: 312000,
                end_timestamp: 314000,
                line_text: 'or it will go out for an order.',
                character_length: 29,
              },
              {
                start_timestamp: 327000,
                end_timestamp: 329000,
                line_text: 'ability to seamlessly interact',
                character_length: 30,
              },
              {
                start_timestamp: 338000,
                end_timestamp: 340000,
                line_text: 'you throw a bunch of hard things',
                character_length: 31,
              },
              {
                start_timestamp: 345000,
                end_timestamp: 347000,
                line_text: 'lay that paper pattern onto the',
                character_length: 31,
              },
              {
                start_timestamp: 355000,
                end_timestamp: 357000,
                line_text: 'exterior parts of the leather,',
                character_length: 28,
              },
              {
                start_timestamp: 374000,
                end_timestamp: 376000,
                line_text: 'producing little leather goods.',
                character_length: 30,
              },
              {
                start_timestamp: 397000,
                end_timestamp: 399000,
                line_text: 'I had a palette in mind already,',
                character_length: 31,
              },
              {
                start_timestamp: 413000,
                end_timestamp: 415000,
                line_text: 'into the same size parallelogram',
                character_length: 32,
              },
              {
                start_timestamp: 417000,
                end_timestamp: 419000,
                line_text: 'Once I have all the pieces cut,',
                character_length: 30,
              },
              {
                start_timestamp: 426000,
                end_timestamp: 428000,
                line_text: 'tape so it sticks on the glass.',
                character_length: 29,
              },
              {
                start_timestamp: 453000,
                end_timestamp: 455000,
                line_text: 'patina is ready to be applied.',
                character_length: 28,
              },
              {
                start_timestamp: 460000,
                end_timestamp: 462000,
                line_text: 'and you can pop in an air plant.',
                character_length: 30,
              },
              {
                start_timestamp: 462000,
                end_timestamp: 464000,
                line_text: 'So I was really, really excited',
                character_length: 32,
              },
              {
                start_timestamp: 466000,
                end_timestamp: 468000,
                line_text: 'I hope that people love my work',
                character_length: 30,
              },
              {
                start_timestamp: 469000,
                end_timestamp: 471000,
                line_text: 'telling me how much they love it',
                character_length: 31,
              },
              {
                start_timestamp: 472000,
                end_timestamp: 474000,
                line_text: 'that make all the work worth it.',
                character_length: 30,
              },
            ],
            status: 'fail',
          },
        },
        {
          language_code: 'eu',
          file_name: '',
          duration_check: {
            disabled: false,
            threshold: 5000,
            status: 'fail',
          },
          duration_exceeds_video_duration_check: {
            disabled: false,
            status: 'fail',
          },
          //removed :-
          //   time_code_sync_with_video: {
          //     disabled: false,
          //     status: "pass",
          //   },
          acceptable_container_type_check: {
            container_types: ['vtt'],
            status: 'fail',
            disabled: false,
          },
          line_length_check: {
            disabled: false,
            threshold: 30,
            lines: [
              {
                start_timestamp: 7000,
                end_timestamp: 9000,
                line_text: 'When it comes to home products,',
                character_length: 30,
                event_number: 7,
                line_number: 11,
              },
              {
                start_timestamp: 18000,
                end_timestamp: 20000,
                line_text: 'actually started as a challenge',
                character_length: 28,
                event_number: 18,
                line_number: 32,
              },
              {
                start_timestamp: 22000,
                end_timestamp: 24000,
                line_text: 'So upon graduating from school,',
                character_length: 31,
                event_number: 22,
                line_number: 38,
              },
              {
                start_timestamp: 23000,
                end_timestamp: 25000,
                line_text: 'I already hit the ground running',
                character_length: 31,
                event_number: 23,
                line_number: 39,
              },
              {
                start_timestamp: 27000,
                end_timestamp: 29000,
                line_text: 'we use a solid 5/8 hex rod steel',
                character_length: 32,
                event_number: 27,
                line_number: 45,
              },
              {
                start_timestamp: 52000,
                end_timestamp: 54000,
                line_text: "and they're all welded together",
                character_length: 29,
                event_number: 52,
                line_number: 89,
              },
              {
                start_timestamp: 67000,
                end_timestamp: 69000,
                line_text: 'final assembly onto the chair.',
                character_length: 28,
                event_number: 67,
                line_number: 117,
              },
              {
                start_timestamp: 74000,
                end_timestamp: 76000,
                line_text: 'straps that you can do yourself.',
                character_length: 30,
                event_number: 74,
                line_number: 131,
              },
              {
                start_timestamp: 97000,
                end_timestamp: 99000,
                line_text: 'but that you can just be part of',
                character_length: 30,
                event_number: 97,
                line_number: 169,
              },
              {
                start_timestamp: 102000,
                end_timestamp: 104000,
                line_text: 'Not laugh at it. Laugh with it.',
                character_length: 30,
                event_number: 102,
                line_number: 177,
              },
            ],
            status: 'fail',
          },
        },
      ],

      video_encoding_check: {
        disabled: false,
        encoding_formats: ['avc', 'mpeg2', 'h264'],
        status: 'fail',
      },
    },
    status: 'FAILED',
  },
];

// const qc_report = [
//   {
//     qc_target: "Original_File",
//     report: {
//       black_frames: {
//         disabled: false,
//         status: "na",
//         "sections": [],
//         threshold: 8000,
//       },
//       freeze: {
//         disabled: false,
//         status: "na",
//         sections: [],
//         threshold: 8000,
//       },

//       video_resolution_check: {
//         disabled: false,
//         resolution: [],
//         status: "na",
//       },

//       min_video_duration_check: {
//         disabled: false,
//         status: "na",
//         threshold: 5000,
//       },

//       //check newly added
//       av_pts_difference_check: {
//         //name changed //find
//         threshold: 1000,
//         "sections": [],
//         disabled: false,
//         status: "na",
//       },
//       loudness: {
//         disabled: false,
//         sections: [],
//         status: "na",
//         threshold: -22,
//       },
//       silence: {
//         disabled: false,
//         sections: [],
//         status: "na",
//         threshold: 1000,
//       },

//       reason:
//         "loudness check failed, silence check failed, minimum video duration check failed, video resolution check failed, acceptable container type check failed, video encoding check failed",

//       subtitle_validations: [
//         {
//           language_code: "en",
//           file_name: "subtitles_en.vtt",
//           duration_check: {
//             disabled: false,
//             threshold: 5000,
//             status: "na",
//           },
//           duration_exceeds_video_duration_check: {
//             disabled: false,
//             status: "na",
//             subtitle_duration: "01:30:00", // Added missing field
//             video_duration: "01:25:00"
//           },
//           //removed :-
//           //   time_code_sync_with_video: {
//           //     disabled: false,
//           //     status: "pass",
//           //   },

//           line_length_check: {
//             disabled: false,
//             threshold: 30,
//             lines: [],
//             status: "na",
//           },
//         },
//         {
//           language_code: "eu",
//           file_name: "",
//           duration_check: {
//             disabled: false,
//             threshold: 5000,
//             status: "na",
//           },
//           duration_exceeds_video_duration_check: {
//             disabled: false,
//             status: "na",
//           },
//           //removed :-
//           //   time_code_sync_with_video: {
//           //     disabled: false,
//           //     status: "pass",
//           //   },
//           acceptable_container_type_check: {
//             container_types: ["vtt"],
//             status: "fail",
//             disabled: false,
//           },
//           line_length_check: {
//             disabled: false,
//             threshold: 30,
//             lines: [],
//             status: "na",
//           },
//         },
//       ],

//       video_encoding_check: {
//         disabled: false,
//         encoding_formats: ["avc", "mpeg2", "h264"],
//         status: "fail",
//       },
//     },
//     status: "FAILED",
//   },
// ]

export const useGetAssetStats = (
  params: Record<string, string>,
): UseQueryResult<
  AxiosResponse<assetStatsResponse>,
  AxiosError<IErrorResponse>
> => {
  return useQuery(
    ['asset-stats', params['asset_types']],
    () => getAssetStats(params),
    {
      keepPreviousData: true,
      onError(err) {
        // showSnackbar(`Something went wrong with Qc checks API`, 'error');
      },
    },
  );
};

export const useGetAssetsQuery = (values: {
  params: Record<string, string>;
  appliedQuickFilter?: string;
  pollAssets?: boolean;
}): UseQueryResult<AxiosResponse<qcResponse[]>, AxiosError<IErrorResponse>> => {
  const showSnackbar = useCustomSnackbar();
  return useQuery(
    [
      'asset-status',
      values.params['page'],
      values.params['per_page'],
      values.params['publisher_asset_ids'],
      values.params['asset_types'],
      values.appliedQuickFilter,
    ],
    () =>
      getAssetsData(values.params).then((response) => {
        const modifiedResponse = { ...response };

        if (
          modifiedResponse.data &&
          Array.isArray(modifiedResponse.data) &&
          modifiedResponse.data[0]
        ) {
          modifiedResponse.data[0] = {
            ...modifiedResponse.data[0],
            qc_report: qc_report,
          };
        }

        return modifiedResponse;
      }),
    {
      keepPreviousData: true,
      onError(err) {
        showSnackbar(`Failed to fetch asset status and QC report`, 'error');
      },
      refetchInterval: (data) => {
        if (data && values.pollAssets && shouldPollAssets(data.data[0])) {
          return MM_ASSET_POLLING_INTERVAL;
        }
        return false;
      },
    },
  );
};

export const useGetParallelAssetsQuery = (
  assetsCount: number,
  params: Record<string, string>,
  appliedQuickFilter?: string,
): UseQueryResult<
  AxiosResponse<qcResponse[]>,
  AxiosError<IErrorResponse>
>[] => {
  const showSnackbar = useCustomSnackbar();

  const queries: {
    queryKey: string[];
    queryFn: () => Promise<AxiosResponse>;
    onError: (err: AxiosError<IErrorResponse>) => void;
    keepPreviousData: boolean;
    enabled: boolean;
  }[] = [];

  if (assetsCount) {
    const assetsPerQuery = parseInt(params['per_page'])
      ? parseInt(params['per_page'])
      : GMS_QUERY_API_MAX_LIMIT;

    const numberOfQueries = Math.ceil(assetsCount / assetsPerQuery);

    for (let i = 0; i < numberOfQueries; i++) {
      const query: Record<string, string> = {
        ...params,
        page: i.toString(),
        per_page: assetsPerQuery.toString(),
      };

      queries.push({
        queryKey: [
          'asset-status',
          query['page'],
          query['per_page'],
          query['publisher_asset_ids'],
          query['asset_types'],
          appliedQuickFilter || '',
        ],
        queryFn: () =>
          getAssetsData(params).then((response) => {
            const modifiedResponse = { ...response };

            if (
              modifiedResponse.data &&
              Array.isArray(modifiedResponse.data) &&
              modifiedResponse.data[0]
            ) {
              modifiedResponse.data[0] = {
                ...modifiedResponse.data[0],
                qc_report: qc_report,
              };
            }

            return modifiedResponse;
          }),
        onError: (err: AxiosError<IErrorResponse>) => {
          showSnackbar('Failed to fetch asset status and QC report', 'error');
        },
        keepPreviousData: true,
        enabled: !!assetsCount,
      });
    }
  }

  return useQueries(
    queries.length > 0
      ? queries
      : [
          {
            queryKey: [
              'asset-status',
              params['page'],
              params['per_page'],
              params['publisher_asset_ids'],
              params['asset_types'],
              appliedQuickFilter || '',
            ],
            queryFn: () =>
              getAssetsData(params).then((response) => {
                const modifiedResponse = { ...response };

                if (
                  modifiedResponse.data &&
                  Array.isArray(modifiedResponse.data) &&
                  modifiedResponse.data[0]
                ) {
                  modifiedResponse.data[0] = {
                    ...modifiedResponse.data[0],
                    qc_report: qc_report,
                  };
                }

                return modifiedResponse;
              }),
            onError: () => {
              showSnackbar(
                'Failed to fetch asset status and QC report',
                'error',
              );
            },
            keepPreviousData: true,
            enabled: !!assetsCount,
          },
        ],
  );
};
