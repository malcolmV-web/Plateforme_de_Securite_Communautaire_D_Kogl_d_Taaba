Elasticsearch security features have been automatically configured!
✅ Authentication is enabled and cluster connections are encrypted.

ℹ️  Password for the elastic user (reset with `bin/elasticsearch-reset-password -u elastic`):
  gMXsRieFS=PMpf7Omnir

ℹ️  HTTP CA certificate SHA-256 fingerprint:
  ed91dc5cae8eecc6a7e0ffe28b94be0353271d2cd28f1722ed80ae8698fbec41

ℹ️  Configure Kibana to use this cluster:
• Run Kibana and click the configuration link in the terminal when Kibana starts.
• Copy the following enrollment token and paste it into Kibana in your browser (valid for the next 30 minutes):
  eyJ2ZXIiOiI4LjE0LjAiLCJhZHIiOlsiMTkyLjE2OC4xLjc5OjkyMDAiXSwiZmdyIjoiZWQ5MWRjNWNhZThlZWNjNmE3ZTBmZmUyOGI5NGJlMDM1MzI3MWQyY2QyOGYxNzIyZWQ4MGFlODY5OGZiZWM0MSIsImtleSI6InNBZVZOSmdCckdwZWQ4bjB3S2x2OlpGVFNQN0FVSndHRXFFZVcxUXRkVEEifQ==

ℹ️  Configure other nodes to join this cluster:
• On this node:
  ⁃ Create an enrollment token with `bin/elasticsearch-create-enrollment-token -s node`.
  ⁃ Uncomment the transport.host setting at the end of config/elasticsearch.yml.
  ⁃ Restart Elasticsearch.
• On other nodes:
  ⁃ Start Elasticsearch with `bin/elasticsearch --enrollment-token <token>`, using the enrollment token that you generated.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━




[2025-07-23T00:01:27,687][INFO ][o.e.c.m.MetadataCreateIndexService] [malcolmv] [.ds-ilm-history-7-2025.07.23-000001] creating index, cause [initialize_data_stream], templates [ilm-history-7], shards [1]/[1]
[2025-07-23T00:01:27,688][INFO ][o.e.c.m.MetadataCreateDataStreamService] [malcolmv] adding data stream [ilm-history-7] with write index [.ds-ilm-history-7-2025.07.23-000001], backing indices [], and aliases []
[2025-07-23T00:01:27,691][INFO ][o.e.c.r.a.AllocationService] [malcolmv] updating number_of_replicas to [0] for indices [.ds-ilm-history-7-2025.07.23-000001]
[2025-07-23T00:01:27,875][INFO ][o.e.c.r.a.AllocationService] [malcolmv] current.health="GREEN" message="Cluster health status changed from [YELLOW] to [GREEN] (reason: [shards started [[.ds-ilm-history-7-2025.07.23-000001][0]]])." previous.health="YELLOW" reason="shards started [[.ds-ilm-history-7-2025.07.23-000001][0]]"

