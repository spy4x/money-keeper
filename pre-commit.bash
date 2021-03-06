#!/bin/sh

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[1;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color


printf "${BLUE}Format code${NC}"
npm run format:all
EXIT_CODE=$?
if [[ ${EXIT_CODE} -ne 0 ]]; then
  printf "${RED}Format failed${NC}\n"
  exit 1
fi

printf "${BLUE}Lint code${NC}"
npm run lint:all
EXIT_CODE=$?
if [[ ${EXIT_CODE} -ne 0 ]]; then
  printf "${RED}Lint failed${NC}\n"
  exit 1
fi


#printf "${BLUE}Run unit-tests${NC}"
#npm run test:pre-commit -- -sr
#EXIT_CODE=$?
#if [[ ${EXIT_CODE} -ne 0 ]]; then
#  printf "${RED}Tests failed${NC}\n"
#  exit 1
#fi


#printf "${BLUE}Run e2e-tests${NC}"
#npm run e2e
#EXIT_CODE=$?
#if [[ ${EXIT_CODE} -ne 0 ]]; then
#  printf "${RED}E2E Tests failed${NC}\n"
#  exit 1
#fi


printf "${BLUE}Test build${NC}"
npm run build:all
EXIT_CODE=$?
if [[ ${EXIT_CODE} -ne 0 ]]; then
  printf "${RED}Build failed${NC}\n"
  exit 1
fi

printf "${GREEN}It seems that all checks are completed. Good luck with commit!${NC}\n"
