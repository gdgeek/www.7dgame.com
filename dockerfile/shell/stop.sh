set -e

echo "Stopping containers..."
docker stop mrpp-web

echo "Removing containers..."
docker rm mrpp-web

echo "Done."