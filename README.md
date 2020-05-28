# Intro
Here you find the new *details-v2* service written in node.js.
This service has ontop of the Ruby implmentation the following capabilities:
* Written in nodejs (one language less in the overall application)
* Support prometheus metrics (via /metric) 
* livenessProbe via http /health
* readinessProbe via file /app/healthy
* use environment variable LOG_LEVEL to control logging level
* service changes pod port 3000 to service port 9080
* can coexist with details-v1 (by adding `version: v1` to existing service)

## Build
To build the container image locally:
```bash
docker build -t bookinfo-details-v2:1 .
```

To push the image to IBM Container Registry Frankfurt ensure you have done these commands:
```bash
ibmcloud login
ibmcloud cr region-set eu-central
ibmcloud cr login
```

Once logged in to the container registry tag the local image and push it up to the docker registry in Frankfurt:
```bash
docker tag bookinfo-details-v2:1 de.icr.io/kmddk/bookinfo-details-v2:1 
docker push de.icr.io/kmddk/bookinfo-details-v2:1 
```

## Deploy manually
Before deploying the current service needs to be modified by adding a version tag to the service selector. 
Alter the current service `details` to add a version selector. You can do this anyway that works for you (web, oc edit, download the file and apply it again).  Ensure to add the `version: v1` to he selector section of the service YAML.
```yaml
selector:
    app: details
    version: v1
```

Now add a deployment named `details-v2` to the project. Adding this will not impact the running `producypage-v1`, when done this way.
```bash
oc apply -f openshift/deployment.yaml 
```

And add the new service named `details-v2` notice how it has a selector that only sends traffic to pods with `version: v2`:
```bash
oc apply -f openshift/service.yaml
```

### Check services manually
By using portforwarding have a look at how the two services `details` and `details-v2` gives consistenly different results.

`details`does not contain the cover attribute:
```bash
oc port-forward svc/details 9080:9080
```
Open http://localhost:9080/details/9780486424613  and see no cover attribute.

Then afterwards check `details-v2` and see how it does container cover attribute:

```bash
oc port-forward svc/details-v2 9080:9080
```

Open http://localhost:9080/details/9780486424613 and see the cover attribute.

You now have the two services running in parallel without impacting the prodoctpage-v1.
