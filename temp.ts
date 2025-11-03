{
    "name": "Content_airing_performance_Jun 6, 2025, 15:09:57",
    "report_type": "LINEAR_REPORT",
    "payload": {
        "entity": "content_playout_metrics",
        "start_time": "2025-05-30T00:00:00.000Z",
        "end_time": "2025-06-05T23:59:59.999Z",
        "timezone": "UTC",
        "granularity": "",
        "fields": [
            "content_name",
            "content_id",
            "channel_name",
            "platform_name",
            "content_playout_start_time",
            "content_duration",
            "device_brand",
            "device_type",
            "country",
            "division",
            "city",
            "content_series"
        ],
        "metrics": [
            "total_viewership_minutes",
            "aggregated_unique_viewers",
            "aggregated_dynamic_ad_impressions_count",
            "number_of_session",
            "avg_session_duration_minutes"
        ],
        "filters": [
            {
                "field": "content_name",
                "operator": "in",
                "value": [
                    "The Lost Husband",
                    "Georgia Rule",
                    "A Royal Makeover",
                    "A Royal Recipe for Love",
                    "Home for a Royal Heart"
                ]
            },
            {
                "field": "channel_id",
                "operator": "in",
                "value": [
                    "amg00346c9"
                ]
            },
            {
                "field": "platform_id",
                "operator": "in",
                "value": [
                    "amgplt0022"
                ]
            },
            {
                "field": "device_brand",
                "operator": "in",
                "value": [
                    "Vizio"
                ]
            },
            {
                "field": "device_type",
                "operator": "in",
                "value": [
                    "TV"
                ]
            },
            {
                "field": "country",
                "operator": "in",
                "value": [
                    "United States"
                ]
            },
            {
                "field": "division",
                "operator": "in",
                "value": [
                    "California",
                    "New York",
                    "Alabama"
                ]
            },
            {
                "field": "city",
                "operator": "in",
                "value": [
                    "Enterprise",
                    "Scotts Valley"
                ]
            }
        ],
        "sort": {
            "field": "channel_name",
            "direction": "desc"
        }
    },
    "schedule": {
        "days": "30",
        "from": "2025-06-06T09:43:48.293Z",
        "to": "2025-07-06T09:43:48.293Z"
    },
    "description": "UI test",
    "recipients": [
        "c-shubham.shinde@amagi.com"
    ]
}