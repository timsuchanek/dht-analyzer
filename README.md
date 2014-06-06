DHT Analyzer
============

This node.js script helps analyzing the Geography of peers of
Bittorrent's Mainline DHT network. The data comes from Prof.
Hartensteins Institute at the Steinbuch Centre for Computing (SCC) at
the Karlsruher Institut für Technologie (KIT).

## Sources
[BitCoinStatus](http://bitcoinstatus.rowit.co.uk/)

[Bitcoin Paper Barcelona](http://fc14.ifca.ai/bitcoin/papers/bitcoin14_submission_3.pdf)

## How to run

```sh
    $ git clone https://github.com/timsuchanek/dht-analyzer.git
    $ cd dht-analyzer
    $ npm install
    $ node index.js
```

## Result
The found pearson correlations are:

    1.  0.7373965598258574 (Barcelona paper)
    2.  0.6747438803309105 (http://bitcoinstatus.rowit.co.uk/)

