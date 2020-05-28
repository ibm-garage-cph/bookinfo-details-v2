# Intro


# Build

ibmcloud login
ibmcloud cr XXXX
ibmcloud cr login

docker build -t bookinfo-details-v2:1 .
docker tag bookinfo-details-v2:1 de.icr.io/kmddk/bookinfo-details-v2:1 
docker push de.icr.io/kmddk/bookinfo-details-v2:1 


# Deploy manually

Alter the current sevice `details` to add a version selector.
```
selector:
    app: details
    version: v1
```

oc apply -f openshift/deployment.yaml  # adding new details-v2 deployment, not impacting running productpage-v1

oc apply -f openshift/service.yaml #

# Check port forwarding for
oc port-forward svc/details 9080:9080

curl http://localhost:9080/details/9780486424613  # no cover attribute

oc port-forward svc/details-v2 9080:9080

curl http://localhost:9080/details/9780486424613  # cover attribute



# Deploy via tekton

